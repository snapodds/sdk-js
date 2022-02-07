import { Injectable } from '@angular/core';
import { TvSearchResult } from '@response/typings';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { TvSearchNoResultError } from '../api/api-errors';
import { TvSearchService } from '../api/tv-search.service';
import { LoggerService } from '../logger/logger.service';
import { GoogleAnalyticsService } from '../tracking/google-analytics.service';

@Injectable({ providedIn: 'root' })
export class SnapOddsFacade {
  constructor(
    private readonly tvSearchService: TvSearchService,
    private readonly logger: LoggerService,
    private readonly analyticsService: GoogleAnalyticsService
  ) {}

  /**
   * Performs the search of an SportEvent by an image.
   * Trigger the analytics to register positive / negative and failed results.
   * @param imageData
   */
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

  /**
   * Find SportEvent when the search is triggered programmatically.
   * @param imageData
   */
  autoSearchSport(imageData: Blob): Observable<TvSearchResult> {
    return this.tvSearchService.autoSearchSport(imageData);
  }
}
