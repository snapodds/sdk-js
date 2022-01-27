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

  requestAccessToken(): Observable<string> {
    if (this.hasValidAccessToken()) {
      return of(this.accessToken as string);
    }

    return from(this.applicationConfigService.accessTokenProvider()).pipe(
      map((accessToken) => this.updateToken(accessToken))
    );
  }

  updateToken(authResponse: AccessToken): string {
    this.tokenExpirationDate = addSeconds(new Date(), authResponse.expires_in);
    this.accessToken = authResponse.access_token;
    return this.accessToken;
  }

  getAccessToken(): string | undefined {
    return this.accessToken;
  }

  hasValidAccessToken(): boolean {
    return Boolean(this.accessToken) && !this.isTokenExpired();
  }

  private isTokenExpired(): boolean {
    return differenceInSeconds(this.tokenExpirationDate ?? new Date(), new Date()) < this.tokenRefreshOffset;
  }
}
