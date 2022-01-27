import { Injectable } from '@angular/core';
import { TvSearchResult } from '@response/typings';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { LineOdds } from '../../models/line-odds';
import { OddsService } from '../api/odds.service';
import { TvSearchService } from '../api/tv-search.service';
import { LoggerService } from '../logger/logger.service';
import { GoogleAnalyticsService } from '../tracking/google-analytics.service';
import { TvSearchNoResultError } from '../api/api-errors';

@Injectable({ providedIn: 'root' })
export class SnapOddsFacade {
  constructor(
    private readonly tvSearchService: TvSearchService,
    private readonly oddsService: OddsService,
    private readonly logger: LoggerService,
    private readonly analyticsService: GoogleAnalyticsService
  ) {}

  searchSport(imageData: Blob): Observable<TvSearchResult> {
    this.analyticsService.snapViewSnap();

    const snapStartTime = Date.now();
    return this.tvSearchService.searchSport(imageData).pipe(
      catchError((error) => {
        const duration = Date.now() - snapStartTime;
        if (error instanceof TvSearchNoResultError) {
          this.analyticsService.snapViewSnapNegative(duration);
        } else {
          this.analyticsService.snapViewSnapFailed(duration);
        }
        return throwError(error);
      }),
      tap(() => this.analyticsService.snapViewSnapResult(Date.now() - snapStartTime))
    );
  }

  autoSearchSport(imageData: Blob): Observable<TvSearchResult> {
    return this.tvSearchService.autoSearchSport(imageData);
  }

  getLineOdds(sportEventId: number): Observable<LineOdds> {
    return this.oddsService.gameLineOddsBySportEventId(sportEventId);
  }
}
