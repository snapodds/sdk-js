import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { sportEventTvSearchMock } from '@response/mocks';
import { mock, MockProxy } from 'jest-mock-extended';
import { ApplicationConfigService } from '../config/application-config.service';
import { LoggerService } from '../logger/logger.service';

import { TvSearchService } from './tv-search.service';

describe('TvSearchService', () => {
  const apiUrl = 'API_URL';
  const image: Blob = new Blob();

  let service: TvSearchService;
  let http: HttpTestingController;
  let logger: MockProxy<LoggerService>;

  let applicationConfigService: MockProxy<ApplicationConfigService>;

  beforeEach(() => {
    logger = mock<LoggerService>();
    applicationConfigService = mock<ApplicationConfigService>();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: LoggerService, useValue: logger },
        { provide: ApplicationConfigService, useValue: applicationConfigService },
      ],
    });

    service = TestBed.inject(TvSearchService);
    http = TestBed.inject(HttpTestingController);

    applicationConfigService.getApiUrl.mockReturnValue(apiUrl);
  });

  it('should return the apiUrl from the application config', () => {
    expect(service.baseUrl).toBe(apiUrl);
  });

  it('should find sport event by image', (done) => {
    service.searchSport(image).subscribe((response) => {
      expect(response).toBe(sportEventTvSearchMock);
      done();
    });

    const httpRequest = http.expectOne(`${service.baseUrl}/tv-search/sport/by-image`);
    httpRequest.flush(sportEventTvSearchMock);

    const { headers } = httpRequest.request;
    expect(headers.get('Content-type')).toBe('application/octet-stream');
    expect(headers.get('X-Snapscreen-MimeType')).toBe('image/jpeg');
    expect(headers.has('X-Snapscreen-Timestamp')).toBe(false);
  });

  it('should find sport event by image near a timestamp', (done) => {
    jest.useFakeTimers().setSystemTime(Date.now());

    service.autoSearchSport(image).subscribe((response) => {
      expect(response).toBe(sportEventTvSearchMock);

      done();
    });

    const httpRequest = http.expectOne(`${service.baseUrl}/tv-search/sport/near-timestamp/by-image`);
    httpRequest.flush(sportEventTvSearchMock, { headers: { Date: new Date().toISOString() } });

    const { headers } = httpRequest.request;
    expect(headers.get('Content-type')).toBe('application/octet-stream');
    expect(headers.get('X-Snapscreen-MimeType')).toBe('image/jpeg');
    expect(headers.get('X-Snapscreen-Timestamp')).toBe(`${Date.now()}`);
  });

  it('should write snapViewSnapNegative analytics when resultEntries are empty', (done) => {
    const emptySportEventResultEntries = { ...sportEventTvSearchMock, resultEntries: [] };

    service.searchSport(image).subscribe((response) => {
      expect(response).toBe(emptySportEventResultEntries);
      done();
    });

    const httpRequest = http.expectOne(`${service.baseUrl}/tv-search/sport/by-image`);
    httpRequest.flush(emptySportEventResultEntries);
  });

  afterAll(() => {
    http.verify();
  });
});
