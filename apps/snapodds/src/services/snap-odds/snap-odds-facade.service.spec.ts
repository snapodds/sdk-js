import { TestBed } from '@angular/core/testing';
import { sportEventsMock } from '@response/mocks';
import { SportEventResultEntryResponse } from '@response/typings';
import { mock, MockProxy } from 'jest-mock-extended';
import { of, throwError } from 'rxjs';
import { lineOddsMapped } from '../api/line-odds.mapped';
import { SnapscreenApiService } from '../api/snapscreen-api.service';
import { SportEventOddsService } from '../api/sport-event-odds.service';
import { AuthService } from '../auth/auth.service';
import { LoggerService } from '../logger/logger.service';
import { SnapOddsNoResultError } from './snap-odds-errors';
import { SnapOddsFacade } from './snap-odds-facade.service';

describe('SnapOddsFacadeService', () => {
  const imageData: Blob = new Blob();

  let facade: SnapOddsFacade;
  let snapScreenApi: MockProxy<SnapscreenApiService>;
  let oddsApi: MockProxy<SportEventOddsService>;
  let logger: MockProxy<LoggerService>;
  let authService: MockProxy<AuthService>;

  beforeEach(() => {
    snapScreenApi = mock<SnapscreenApiService>();
    oddsApi = mock<SportEventOddsService>();
    logger = mock<LoggerService>();
    authService = mock<AuthService>();

    TestBed.configureTestingModule({
      providers: [
        { provide: SnapscreenApiService, useValue: snapScreenApi },
        { provide: SportEventOddsService, useValue: oddsApi },
        { provide: LoggerService, useValue: logger },
        { provide: AuthService, useValue: authService },
      ],
    });

    facade = TestBed.inject(SnapOddsFacade);
    authService.refreshAccessToken.mockReturnValue(of('ACCESS_TOKEN'));
  });

  describe('getSnap', () => {
    it('should get odds via a webcam snapshot', (done) => {
      snapScreenApi.sportSnap.mockReturnValue(of(sportEventsMock));

      facade.getSnap(imageData, false).subscribe((sportEventsResult) => {
        expect(sportEventsResult).toBe(sportEventsMock);
        expect(snapScreenApi.sportSnap).toHaveBeenCalledWith(imageData);
        done();
      });
    });

    it('should get odds via a webcam snapshot near a timestamp', (done) => {
      snapScreenApi.sportAutoSnap.mockReturnValue(of(sportEventsMock));

      facade.getSnap(imageData, true).subscribe((sportEventResult) => {
        expect(sportEventResult).toBe(sportEventsMock);
        expect(snapScreenApi.sportAutoSnap).toHaveBeenCalledWith(imageData);
        done();
      });
    });

    it('should throw error if result entries are empty', (done) => {
      authService.refreshAccessToken.mockReturnValue(of('ACCESS_TOKEN'));
      snapScreenApi.sportSnap.mockReturnValue(of({ ...sportEventsMock, resultEntries: [] }));

      facade.getSnap(imageData, false).subscribe({
        next: () => done.fail(),
        error: (error) => {
          expect(error).toBeInstanceOf(SnapOddsNoResultError);
          done();
        },
      });
    });
  });
  describe('lineOdds', () => {
    it('should load odds from an sportEventId', (done) => {
      const sportEventEntry: SportEventResultEntryResponse = sportEventsMock.resultEntries[0];
      const sportEventId = sportEventEntry.sportEvent.id;

      oddsApi.gameLineOddsBySportEventId.mockReturnValue(of(lineOddsMapped));

      facade.getLineOdds(sportEventId).subscribe((lineOdds) => {
        expect(lineOdds).toBe(lineOddsMapped);
        expect(oddsApi.gameLineOddsBySportEventId).toHaveBeenCalledWith(sportEventId);
        done();
      });
    });

    it('should throw error if lineOdds response is empty', (done) => {
      oddsApi.gameLineOddsBySportEventId.mockReturnValue(throwError(() => 'LINE_ODDS_FAILED'));

      facade.getLineOdds(1).subscribe({
        next: () => done.fail(),
        error: (error) => {
          expect(error).toBeInstanceOf(SnapOddsNoResultError);
          done();
        },
      });
    });
  });
});
