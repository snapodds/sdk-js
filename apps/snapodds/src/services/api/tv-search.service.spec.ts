import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { sportEventTvSearchMock } from '@response/mocks';
import { mock, MockProxy } from 'jest-mock-extended';
import { of } from 'rxjs';
import { ApplicationConfigService } from '../config/application-config.service';
import { LoggerService } from '../logger/logger.service';
import { AuthService } from '../auth/auth.service';
import { TvSearchService } from './tv-search.service';
import { TvSearchNoResultError } from './api-errors';

describe('TvSearchService', () => {
  const apiUrl = 'API_URL';
  const image: Blob = new Blob();

  let service: TvSearchService;
  let http: HttpTestingController;
  let logger: MockProxy<LoggerService>;
  let authService: MockProxy<AuthService>;
  let applicationConfigService: MockProxy<ApplicationConfigService>;

  beforeEach(() => {
    logger = mock<LoggerService>();
    authService = mock<AuthService>();
    applicationConfigService = mock<ApplicationConfigService>();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: LoggerService, useValue: logger },
        { provide: AuthService, useValue: authService },
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

  describe('searchSport', () => {
    it('should find sport event by image', (done) => {
      authService.requestAccessToken.mockReturnValue(of('ACCESS_TOKEN'));

      service.searchSport(image).subscribe((response) => {
        expect(response).toBe(sportEventTvSearchMock);
        done();
      });

      const httpRequest = http.expectOne(`${service.baseUrl}/tv-search/sport/by-image`);
      httpRequest.flush(sportEventTvSearchMock);

      const { headers } = httpRequest.request;
      expect(headers.get('Authorization')).toBe('Bearer ACCESS_TOKEN');
      expect(headers.get('Content-type')).toBe('application/octet-stream');
      expect(headers.get('X-Snapscreen-MimeType')).toBe('image/jpeg');
      expect(headers.has('X-Snapscreen-Timestamp')).toBe(false);
    });

    it('should throw error when empty response', (done) => {
      authService.requestAccessToken.mockReturnValue(of('ACCESS_TOKEN'));

      service.searchSport(image).subscribe({
        next: () => done.fail(),
        error: (error) => {
          expect(error).toBeInstanceOf(TvSearchNoResultError);
          done();
        },
      });

      const httpRequest = http.expectOne(`${service.baseUrl}/tv-search/sport/by-image`);
      httpRequest.flush({ ...sportEventTvSearchMock, resultEntries: [] });

      const { headers } = httpRequest.request;
      expect(headers.get('Authorization')).toBe('Bearer ACCESS_TOKEN');
      expect(headers.get('Content-type')).toBe('application/octet-stream');
      expect(headers.get('X-Snapscreen-MimeType')).toBe('image/jpeg');
      expect(headers.has('X-Snapscreen-Timestamp')).toBe(false);
    });
  });

  describe('autoSearchSport', () => {
    it('should find sport event by image near a timestamp', (done) => {
      authService.requestAccessToken.mockReturnValue(of('ACCESS_TOKEN'));
      jest.useFakeTimers().setSystemTime(Date.now());

      service.autoSearchSport(image).subscribe((response) => {
        expect(response).toBe(sportEventTvSearchMock);

        done();
      });

      const httpRequest = http.expectOne(`${service.baseUrl}/tv-search/sport/near-timestamp/by-image`);
      httpRequest.flush(sportEventTvSearchMock, { headers: { Date: new Date().toISOString() } });

      const { headers } = httpRequest.request;
      expect(headers.get('Authorization')).toBe('Bearer ACCESS_TOKEN');
      expect(headers.get('Content-type')).toBe('application/octet-stream');
      expect(headers.get('X-Snapscreen-MimeType')).toBe('image/jpeg');
      expect(headers.get('X-Snapscreen-Timestamp')).toBe(`${Date.now()}`);
    });

    it('should throw error when empty response', (done) => {
      authService.requestAccessToken.mockReturnValue(of('ACCESS_TOKEN'));
      jest.useFakeTimers().setSystemTime(Date.now());

      service.autoSearchSport(image).subscribe({
        next: () => done.fail(),
        error: (error) => {
          expect(error).toBeInstanceOf(TvSearchNoResultError);
          done();
        },
      });

      const httpRequest = http.expectOne(`${service.baseUrl}/tv-search/sport/near-timestamp/by-image`);
      httpRequest.flush({ ...sportEventTvSearchMock, resultEntries: [] });

      const { headers } = httpRequest.request;
      expect(headers.get('Authorization')).toBe('Bearer ACCESS_TOKEN');
      expect(headers.get('Content-type')).toBe('application/octet-stream');
      expect(headers.get('X-Snapscreen-MimeType')).toBe('image/jpeg');
      expect(headers.get('X-Snapscreen-Timestamp')).toBe(`${Date.now()}`);
    });
  });

  afterAll(() => {
    http.verify();
  });
});
