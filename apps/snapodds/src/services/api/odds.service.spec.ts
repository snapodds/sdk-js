import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { lineOddsMock } from '@response/mocks';
import { mock, MockProxy } from 'jest-mock-extended';
import { AuthService } from '../auth/auth.service';
import { ApplicationConfigService } from '../config/application-config.service';
import { lineOddsMapped } from './line-odds.mapped';
import { OddsService } from './odds.service';
import { of } from 'rxjs';

describe('OddsService', () => {
  let service: OddsService;
  let http: HttpTestingController;
  let authService: MockProxy<AuthService>;
  let applicationConfigService: MockProxy<ApplicationConfigService>;

  beforeEach(() => {
    authService = mock<AuthService>();
    applicationConfigService = mock<ApplicationConfigService>();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: ApplicationConfigService, useValue: applicationConfigService },
      ],
    });

    service = TestBed.inject(OddsService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should map response to lineOdds', (done) => {
    authService.requestAccessToken.mockReturnValue(of('ACCESS_TOKEN'));
    const sportEventId = 12345;

    service.gameLineOddsBySportEventId(sportEventId).subscribe({
      next: (response) => {
        expect(response).toEqual(lineOddsMapped);
        done();
      },
      error: () => done.fail(),
    });

    const requests: TestRequest[] = http.match(
      (request) =>
        request.headers.has('Authorization') &&
        request.url === `${service.baseUrl}/sport/events/${sportEventId}/odds/lines`
    );

    requests[0].flush(lineOddsMock);
  });
});
