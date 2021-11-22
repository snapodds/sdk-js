import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { lineOddsMock } from '@response/mocks';
import { mock, MockProxy } from 'jest-mock-extended';
import { ApplicationConfigService } from '../config/application-config.service';
import { lineOddsMapped } from './line-odds.mapped';
import { SportEventOddsService } from './sport-event-odds.service';

describe('SportEventOddsService', () => {
  let service: SportEventOddsService;
  let http: HttpTestingController;
  let applicationConfigService: MockProxy<ApplicationConfigService>;

  beforeEach(() => {
    applicationConfigService = mock<ApplicationConfigService>();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: ApplicationConfigService, useValue: applicationConfigService }],
    });

    service = TestBed.inject(SportEventOddsService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should map response to lineOdds', (done) => {
    const sportEventId = 12345;

    service.gameLineOddsBySportEventId(sportEventId).subscribe({
      next: (response) => {
        expect(response).toEqual(lineOddsMapped);
        done();
      },
      error: () => done.fail(),
    });

    http.expectOne(`${service.baseUrl}/sport/events/${sportEventId}/odds/lines`).flush(lineOddsMock);
  });
});
