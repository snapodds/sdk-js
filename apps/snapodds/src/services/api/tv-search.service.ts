import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map, switchMap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ApplicationConfigService } from '../config/application-config.service';
import { LoggerService } from '../logger/logger.service';
import { TvSearchResult } from '@response/typings';
import { TvSearchNoResultError } from './api-errors';

@Injectable({
  providedIn: 'root',
})
export class TvSearchService {
  private timeLag = 0;

  constructor(
    private readonly http: HttpClient,
    private readonly logger: LoggerService,
    private readonly authService: AuthService,
    private readonly applicationConfigService: ApplicationConfigService
  ) {}

  get baseUrl() {
    return this.applicationConfigService.getApiUrl();
  }

  get currentTimestamp() {
    return Date.now() - this.timeLag;
  }

  searchSport(imageData: Blob): Observable<TvSearchResult> {
    return this.snap('/tv-search/sport/by-image', imageData);
  }

  autoSearchSport(imageData: Blob): Observable<TvSearchResult> {
    return this.snap('/tv-search/sport/near-timestamp/by-image', imageData, true);
  }

  private snap(url: string, imageData: Blob, nearTimestamp = false): Observable<TvSearchResult> {
    return this.authService.requestAccessToken().pipe(
      switchMap((accessToken) =>
        this.http.post<TvSearchResult>(`${this.baseUrl}${url}`, imageData, {
          headers: this.createSnapscreenHeaders(accessToken, nearTimestamp),
          observe: 'response',
        })
      ),
      tap((response) => this.updateTimeLag(response)),
      map((response) => {
        if (response.body?.resultEntries.length) {
          return response.body;
        } else {
          throw new TvSearchNoResultError();
        }
      })
    );
  }

  private createSnapscreenHeaders(accessToken: string, nearTimestamp: boolean): HttpHeaders {
    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${accessToken}`)
      .set('Content-type', 'application/octet-stream')
      .set('X-Snapscreen-MimeType', 'image/jpeg');

    if (nearTimestamp) {
      headers = headers.set('X-Snapscreen-Timestamp', `${this.currentTimestamp}`);
    }

    return headers;
  }

  private updateTimeLag(response: HttpResponse<TvSearchResult>): void {
    const responseDate = response.headers.get('Date');

    if (responseDate) {
      this.timeLag = Date.now() - Date.parse(responseDate);
      this.logger.debug(`Update time lag interval to ${this.timeLag}`);
    }
  }
}
