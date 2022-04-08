import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TvSearchResult } from '@response/typings';
import { map, Observable, switchMap, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ApplicationConfigService } from '../config/application-config.service';
import { LoggerService } from '../logger/logger.service';
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

  /**
   * Retrieve the apiUrl from the applicationConfig
   */
  get baseUrl(): string {
    return this.applicationConfigService.getApiUrl();
  }

  /**
   * Calculate the difference between the current timestamp and the delay the response took to be processed by the API
   */
  get currentTimestamp(): number {
    return Date.now() - this.timeLag;
  }

  /**
   * Find SportEvent when the user manually triggers the snap.
   * @param imageData: snapshot of the cameras viewport
   */
  searchSport(imageData: Blob): Observable<TvSearchResult> {
    return this.snap('/tv-search/sport/by-image', imageData);
  }

  /**
   * Find SportEvent when the search is triggered programmatically.
   * Takes the current timeStamp into consideration.
   * @param imageData: snapshot of the tv-viewfinders viewport
   */
  autoSearchSport(imageData: Blob): Observable<TvSearchResult> {
    return this.snap('/tv-search/sport/near-timestamp/by-image', imageData, true);
  }

  /**
   * Performs a search by image
   * @param url: API endpoint to perform the search request agianst
   * @param imageData: image to be analyzed
   * @param nearTimestamp: add the currentTimestamp as header
   * @private
   */
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
          throw new TvSearchNoResultError(response.body?.requestUuid);
        }
      })
    );
  }

  /**
   * Create the headers necessary to perform a search on the API
   * @param accessToken: to authenticate the client
   * @param nearTimestamp: add the currentTimestamp as header
   * @private
   */
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

  /**
   * Calculates the difference between now and when the response has been sent.
   * @param response: the response from which the difference is calculated
   * @private
   */
  private updateTimeLag(response: HttpResponse<TvSearchResult>): void {
    const responseDate = response.headers.get('Date');

    if (responseDate) {
      this.timeLag = Date.now() - Date.parse(responseDate);
      this.logger.debug(`Update time lag interval to ${this.timeLag}`);
    }
  }
}
