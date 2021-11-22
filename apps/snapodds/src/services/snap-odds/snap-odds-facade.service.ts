import { Injectable } from '@angular/core';
import { SportEventsResponse } from '@response/typings';
import { catchError, iif, map, Observable, switchMap } from 'rxjs';
import { LineOdds } from '../../models/line-odds';
import { SnapscreenApiService } from '../api/snapscreen-api.service';
import { SportEventOddsService } from '../api/sport-event-odds.service';
import { AuthService } from '../auth/auth.service';
import { LoggerService } from '../logger/logger.service';
import { SnapOddsNoResultError } from './snap-odds-errors';

@Injectable({ providedIn: 'root' })
export class SnapOddsFacade {
  constructor(
    private readonly snapScreenApi: SnapscreenApiService,
    private readonly oddsApi: SportEventOddsService,
    private readonly logger: LoggerService,
    private readonly authService: AuthService
  ) {}

  getSnap(imageData: Blob, autoSnap: boolean): Observable<SportEventsResponse> {
    return this.authService.refreshAccessToken().pipe(
      switchMap(() =>
        iif(() => autoSnap, this.snapScreenApi.sportAutoSnap(imageData), this.snapScreenApi.sportSnap(imageData))
      ),
      map((sportEvents) => {
        if (sportEvents?.resultEntries.length) {
          return sportEvents;
        } else {
          throw new SnapOddsNoResultError();
        }
      })
    );
  }

  getLineOdds(sportEventId: number): Observable<LineOdds> {
    return this.authService.refreshAccessToken().pipe(
      switchMap(() =>
        this.oddsApi.gameLineOddsBySportEventId(sportEventId).pipe(
          catchError(() => {
            throw new SnapOddsNoResultError();
          })
        )
      )
    );
  }
}
