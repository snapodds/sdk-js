import { Injectable } from '@angular/core';
import { TvSearchResult } from '@response/typings';
import { catchError, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { LineOdds } from '../../models/line-odds';
import { OddsService } from '../api/odds.service';
import { TvSearchService } from '../api/tv-search.service';
import { AuthService } from '../auth/auth.service';
import { LoggerService } from '../logger/logger.service';
import { GoogleAnalyticsService } from '../tracking/google-analytics.service';
import { TvSearchNoResultError } from './snap-odds-errors';

@Injectable({ providedIn: 'root' })
export class SnapOddsFacade {
  constructor(
    private readonly tvSearchService: TvSearchService,
    private readonly oddsService: OddsService,
    private readonly logger: LoggerService,
    private readonly authService: AuthService,
    private readonly analyticsService: GoogleAnalyticsService
  ) {}

  getSnap(imageData: Blob, autoSnap: boolean): Observable<TvSearchResult> {
    return this.authService.refreshAccessToken().pipe(
      tap(() => this.analyticsService.snapViewSnap()),
      switchMap(() => {
        if (autoSnap) {
          return this.tvSearchService.autoSearchSport(imageData);
        } else {
          return this.tvSearchService.searchSport(imageData);
        }
      }),
      catchError((error) => {
        this.writeCallFailedAnalytics();
        return throwError(error.error);
      }),
      tap((response) => this.writeSnapResulAnalytics(response)),
      map((result) => {
        if (result?.resultEntries.length) {
          return result;
        } else {
          throw new TvSearchNoResultError();
        }
      })
    );
  }

  getLineOdds(sportEventId: number): Observable<LineOdds> {
    return this.authService
      .refreshAccessToken()
      .pipe(switchMap(() => this.oddsService.gameLineOddsBySportEventId(sportEventId)));
  }

  private writeCallFailedAnalytics(): void {
    this.analyticsService.snapViewSnapFailed(this.tvSearchService.currentSnapTimeOffset);
  }

  private writeSnapResulAnalytics(response: TvSearchResult | null): void {
    if (response?.resultEntries.length) {
      this.analyticsService.snapViewSnapResult(this.tvSearchService.currentSnapTimeOffset);
    } else {
      this.analyticsService.snapViewSnapNegative(this.tvSearchService.currentSnapTimeOffset);
    }
  }
}
