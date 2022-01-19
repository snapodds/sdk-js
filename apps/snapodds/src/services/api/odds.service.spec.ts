import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { authResponseMock, lineOddsMock } from '@response/mocks';
import { mock, MockProxy } from 'jest-mock-extended';
import { AuthService } from '../auth/auth.service';
import { ApplicationConfigService } from '../config/application-config.service';
import { lineOddsMapped } from './line-odds.mapped';
import { OddsService } from './odds.service';

describe('OddsService', () => {
  let service: OddsService;
  let http: HttpTestingController;
  let applicationConfigService: MockProxy<ApplicationConfigService>;
  let authService: AuthService;

  beforeEach(() => {
    applicationConfigService = mock<ApplicationConfigService>();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: ApplicationConfigService, useValue: applicationConfigService }],
    });

    service = TestBed.inject(OddsService);
    http = TestBed.inject(HttpTestingController);

    authService = TestBed.inject(AuthService);
    authService.updateToken(authResponseMock);
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

    const requests: TestRequest[] = http.match(
      (request) =>
        request.headers.has('Authorization') &&
        request.url === `${service.baseUrl}/sport/events/${sportEventId}/odds/lines`
    );

    requests[0].flush(lineOddsMock);
  });
});
