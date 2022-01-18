import { TestBed } from '@angular/core/testing';
import { sportEventTvSearchMock } from '@response/mocks';
import { TvSearchResultEntry } from '@response/typings';
import { mock, MockProxy } from 'jest-mock-extended';
import { of, throwError } from 'rxjs';
import { lineOddsMapped } from '../api/line-odds.mapped';
import { TvSearchService } from '../api/tv-search.service';
import { OddsService } from '../api/odds.service';
import { AuthService } from '../auth/auth.service';
import { LoggerService } from '../logger/logger.service';
import { TvSearchNoResultError } from './snap-odds-errors';
import { SnapOddsFacade } from './snap-odds-facade.service';

describe('SnapOddsFacadeService', () => {
  const imageData: Blob = new Blob();

  let facade: SnapOddsFacade;
  let snapScreenApi: MockProxy<TvSearchService>;
  let oddsApi: MockProxy<OddsService>;
  let logger: MockProxy<LoggerService>;
  let authService: MockProxy<AuthService>;

  beforeEach(() => {
    snapScreenApi = mock<TvSearchService>();
    oddsApi = mock<OddsService>();
    logger = mock<LoggerService>();
    authService = mock<AuthService>();

    TestBed.configureTestingModule({
      providers: [
        { provide: TvSearchService, useValue: snapScreenApi },
        { provide: OddsService, useValue: oddsApi },
        { provide: LoggerService, useValue: logger },
        { provide: AuthService, useValue: authService },
      ],
    });

    facade = TestBed.inject(SnapOddsFacade);
    authService.refreshAccessToken.mockReturnValue(of('ACCESS_TOKEN'));
  });

  describe('getSnap', () => {
    it('should get odds via a webcam snapshot', (done) => {
      snapScreenApi.searchSport.mockReturnValue(of(sportEventTvSearchMock));

      facade.getSnap(imageData, false).subscribe((sportEventsResult) => {
        expect(sportEventsResult).toBe(sportEventTvSearchMock);
        expect(snapScreenApi.searchSport).toHaveBeenCalledWith(imageData);
        done();
      });
    });

    it('should get odds via a webcam snapshot near a timestamp', (done) => {
      snapScreenApi.autoSearchSport.mockReturnValue(of(sportEventTvSearchMock));

      facade.getSnap(imageData, true).subscribe((sportEventResult) => {
        expect(sportEventResult).toBe(sportEventTvSearchMock);
        expect(snapScreenApi.autoSearchSport).toHaveBeenCalledWith(imageData);
        done();
      });
    });

    it('should throw error if result entries are empty', (done) => {
      authService.refreshAccessToken.mockReturnValue(of('ACCESS_TOKEN'));
      snapScreenApi.searchSport.mockReturnValue(of({ ...sportEventTvSearchMock, resultEntries: [] }));

      facade.getSnap(imageData, false).subscribe({
        next: () => done.fail(),
        error: (error) => {
          expect(error).toBeInstanceOf(TvSearchNoResultError);
          done();
        },
      });
    });
  });
  describe('lineOdds', () => {
    it('should load odds from an sportEventId', (done) => {
      const sportEventEntry: TvSearchResultEntry = sportEventTvSearchMock.resultEntries[0];
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
          expect(error);
          done();
        },
      });
    });
  });
});
