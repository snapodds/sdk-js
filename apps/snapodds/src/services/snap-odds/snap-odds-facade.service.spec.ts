import { TestBed } from '@angular/core/testing';
import { sportEventTvSearchMock } from '@response/mocks';
import { TvSearchResultEntry } from '@response/typings';
import { mock, MockProxy } from 'jest-mock-extended';
import { of, throwError } from 'rxjs';
import { lineOddsMapped } from '../api/line-odds.mapped';
import { OddsService } from '../api/odds.service';
import { TvSearchService } from '../api/tv-search.service';
import { LoggerService } from '../logger/logger.service';
import { GoogleAnalyticsService } from '../tracking/google-analytics.service';
import { SnapOddsFacade } from './snap-odds-facade.service';
import { TvSearchNoResultError } from '../api/api-errors';

describe('SnapOddsFacadeService', () => {
  const imageData: Blob = new Blob();

  let facade: SnapOddsFacade;
  let tvSearchService: MockProxy<TvSearchService>;
  let oddsService: MockProxy<OddsService>;
  let logger: MockProxy<LoggerService>;
  let analyticsService: MockProxy<GoogleAnalyticsService>;

  beforeEach(() => {
    tvSearchService = mock<TvSearchService>();
    oddsService = mock<OddsService>();
    logger = mock<LoggerService>();
    analyticsService = mock<GoogleAnalyticsService>();

    TestBed.configureTestingModule({
      providers: [
        { provide: TvSearchService, useValue: tvSearchService },
        { provide: OddsService, useValue: oddsService },
        { provide: LoggerService, useValue: logger },
        { provide: GoogleAnalyticsService, useValue: analyticsService },
      ],
    });

    facade = TestBed.inject(SnapOddsFacade);
  });

  describe('searchSport', () => {
    it('should search sport events by image', (done) => {
      tvSearchService.searchSport.mockReturnValue(of(sportEventTvSearchMock));

      facade.searchSport(imageData).subscribe({
        next: (sportEventsResult) => {
          expect(sportEventsResult).toBe(sportEventTvSearchMock);
          expect(tvSearchService.searchSport).toHaveBeenCalledWith(imageData);
          expect(analyticsService.snapViewSnap).toHaveBeenCalled();
          expect(analyticsService.snapViewSnapResult).toHaveBeenCalled();
          expect(analyticsService.snapViewSnapFailed).not.toHaveBeenCalled();
          expect(analyticsService.snapViewSnapNegative).not.toHaveBeenCalled();
          done();
        },
        error: () => done.fail(),
      });
    });

    it('should report failed snap to analytic service when error', (done) => {
      const thrownError = 'SNAP_FAILED';
      tvSearchService.searchSport.mockReturnValue(throwError(() => thrownError));

      facade.searchSport(imageData).subscribe({
        next: () => done.fail(),
        error: (error) => {
          expect(error).toBe(thrownError);
          expect(tvSearchService.searchSport).toHaveBeenCalledWith(imageData);
          expect(analyticsService.snapViewSnap).toHaveBeenCalled();
          expect(analyticsService.snapViewSnapResult).not.toHaveBeenCalled();
          expect(analyticsService.snapViewSnapFailed).toHaveBeenCalled();
          expect(analyticsService.snapViewSnapNegative).not.toHaveBeenCalled();
          done();
        },
      });
    });

    it('should report negative snap to analytic service when no result error', (done) => {
      const thrownError = new TvSearchNoResultError();
      tvSearchService.searchSport.mockReturnValue(throwError(() => thrownError));

      facade.searchSport(imageData).subscribe({
        next: () => done.fail(),
        error: (error) => {
          expect(error).toBe(thrownError);
          expect(tvSearchService.searchSport).toHaveBeenCalledWith(imageData);
          expect(analyticsService.snapViewSnap).toHaveBeenCalled();
          expect(analyticsService.snapViewSnapResult).not.toHaveBeenCalled();
          expect(analyticsService.snapViewSnapFailed).not.toHaveBeenCalled();
          expect(analyticsService.snapViewSnapNegative).toHaveBeenCalled();
          done();
        },
      });
    });
  });

  describe('autoSearchSport', () => {
    it('should search sport events near a timestamp by image', (done) => {
      tvSearchService.autoSearchSport.mockReturnValue(of(sportEventTvSearchMock));

      facade.autoSearchSport(imageData).subscribe({
        next: (sportEventResult) => {
          expect(sportEventResult).toBe(sportEventTvSearchMock);
          expect(tvSearchService.autoSearchSport).toHaveBeenCalledWith(imageData);
          done();
        },
        error: () => done.fail(),
      });
    });
  });

  describe('lineOdds', () => {
    it('should load odds from an sportEventId', (done) => {
      const sportEventEntry: TvSearchResultEntry = sportEventTvSearchMock.resultEntries[0];
      const sportEventId = sportEventEntry.sportEvent.id;

      oddsService.gameLineOddsBySportEventId.mockReturnValue(of(lineOddsMapped));

      facade.getLineOdds(sportEventId).subscribe((lineOdds) => {
        expect(lineOdds).toBe(lineOddsMapped);
        expect(oddsService.gameLineOddsBySportEventId).toHaveBeenCalledWith(sportEventId);
        done();
      });
    });

    it('should throw error if lineOdds response is empty', (done) => {
      const thrownError = 'LINE_ODDS_FAILED';
      oddsService.gameLineOddsBySportEventId.mockReturnValue(throwError(() => thrownError));

      facade.getLineOdds(1).subscribe({
        next: () => done.fail(),
        error: (error) => {
          expect(error).toBe(thrownError);
          done();
        },
      });
    });
  });
});
