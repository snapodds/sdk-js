import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TvSearchResult } from '@response/typings';
import { catchError, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { ApplicationConfigService } from '../config/application-config.service';
import { LoggerService } from '../logger/logger.service';
import { GoogleAnalyticsService } from '../tracking/google-analytics.service';

@Injectable({
  providedIn: 'root',
})
export class TvSearchService {
  private timeLag = 0;
  private snapTimestamp = 0;

  constructor(
    private readonly http: HttpClient,
    private readonly logger: LoggerService,
    private readonly analyticsService: GoogleAnalyticsService,
    private readonly applicationConfigService: ApplicationConfigService
  ) {}

  get baseUrl() {
    return this.applicationConfigService.getApiUrl();
  }

  get currentTimestamp() {
    return Date.now() - this.timeLag;
  }

  get currentSnapTimeOffset() {
    return Date.now() - this.snapTimestamp;
  }

  searchSport(imageData: Blob): Observable<TvSearchResult | null> {
    return this.snap('/tv-search/sport/by-image', imageData);
  }

  autoSearchSport(imageData: Blob): Observable<TvSearchResult | null> {
    return this.snap('/tv-search/sport/near-timestamp/by-image', imageData, true);
  }

  private snap(url: string, imageData: Blob, addTimestamp = false): Observable<TvSearchResult | null> {
    return of(this.createSnapscreenHeaders(addTimestamp)).pipe(
      tap(() => {
        this.snapTimestamp = Date.now();
        this.analyticsService.snapViewSnap();
      }),
      switchMap((headers) =>
        this.http.post<TvSearchResult>(`${this.baseUrl}${url}`, imageData, { headers, observe: 'response' })
      ),
      catchError((error) => {
        this.writeCallFailedAnalytics();
        return throwError(error.error);
      }),
      tap((response) => this.writeSnapResulAnalytics(response)),
      tap((response) => this.writeTimeLag(response)),
      map((response) => response.body)
    );
  }

  private createSnapscreenHeaders(addTimestamp: boolean): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/octet-stream');
    headers = headers.set('X-Snapscreen-MimeType', 'image/jpeg');

    if (addTimestamp) {
      headers = headers.set('X-Snapscreen-Timestamp', `${this.currentTimestamp}`);
    }

    return headers;
  }

  private writeCallFailedAnalytics(): void {
    this.analyticsService.snapViewSnapFailed(this.currentSnapTimeOffset);
  }

  private writeSnapResulAnalytics(response: HttpResponse<TvSearchResult>): void {
    if (response.body?.resultEntries.length) {
      this.analyticsService.snapViewSnapResult(this.currentSnapTimeOffset);
    } else {
      this.analyticsService.snapViewSnapNegative(this.currentSnapTimeOffset);
    }
  }

  private writeTimeLag(response: HttpResponse<TvSearchResult>): void {
    const responseDate = response.headers.get('Date');

    if (responseDate) {
      this.timeLag = Date.now() - Date.parse(responseDate);
      this.logger.debug(`Update time lag interval to ${this.timeLag}`);
    }
  }
}
