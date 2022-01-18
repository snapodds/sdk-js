import { Injectable } from '@angular/core';
import { TvSearchResult } from '@response/typings';
import { catchError, iif, map, Observable, switchMap } from 'rxjs';
import { LineOdds } from '../../models/line-odds';
import { TvSearchService } from '../api/tv-search.service';
import { OddsService } from '../api/odds.service';
import { AuthService } from '../auth/auth.service';
import { LoggerService } from '../logger/logger.service';
import { TvSearchNoResultError } from './snap-odds-errors';

@Injectable({ providedIn: 'root' })
export class SnapOddsFacade {
  constructor(
    private readonly tvSearchService: TvSearchService,
    private readonly oddsService: OddsService,
    private readonly logger: LoggerService,
    private readonly authService: AuthService
  ) {}

  getSnap(imageData: Blob, autoSnap: boolean): Observable<TvSearchResult> {
    return this.authService.refreshAccessToken().pipe(
      switchMap(() => {
        if (autoSnap) {
          return this.tvSearchService.autoSearchSport(imageData);
        } else {
          return this.tvSearchService.searchSport(imageData);
        }
      }),
      map((sportEvents) => {
        if (sportEvents?.resultEntries.length) {
          return sportEvents;
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
}
