import { Injectable } from '@angular/core';
import { AccessToken } from '@response/typings';
import { addSeconds, differenceInSeconds } from 'date-fns';
import { from, map, Observable, of } from 'rxjs';
import { ApplicationConfigService } from '../config/application-config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessToken?: string;
  private tokenExpirationDate?: Date;

  private readonly tokenRefreshOffset = 60;

  constructor(private readonly applicationConfigService: ApplicationConfigService) {}

  /**
   * When no accessToken is present the callback to request an accessToken is invoked.
   * If a valid accessToken is present it will be returned instead.
   */
  requestAccessToken(): Observable<string> {
    if (this.hasValidAccessToken()) {
      return of(this.accessToken as string);
    }

    return from(this.applicationConfigService.accessTokenProvider()).pipe(
      map((accessToken) => this.updateToken(accessToken))
    );
  }

  /**
   * Stores the current accessToken and sets the token's expiration date.
   * @param authResponse: response from with the token is extracted
   */
  updateToken(authResponse: AccessToken): string {
    this.tokenExpirationDate = addSeconds(new Date(), authResponse.expires_in);
    this.accessToken = authResponse.access_token;
    return this.accessToken;
  }

  /**
   * Returns the currently stored accessToken.
   */
  getAccessToken(): string | undefined {
    return this.accessToken;
  }

  /**
   * Verifies the token validity based on the expiration date.
   */
  hasValidAccessToken(): boolean {
    return Boolean(this.accessToken) && !this.isTokenExpired();
  }

  /**
   * True unless the token's lifetime has been reached.
   * @private
   */
  private isTokenExpired(): boolean {
    return differenceInSeconds(this.tokenExpirationDate ?? new Date(), new Date()) < this.tokenRefreshOffset;
  }
}
