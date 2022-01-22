import { HttpHeaders } from '@angular/common/http';
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

  refreshAccessToken(): Observable<string | undefined> {
    if (this.hasValidAccessToken()) {
      return of(this.accessToken);
    } else {
      return from(this.applicationConfigService.accessTokenProvider()).pipe(
        map((accessToken) => this.updateToken(accessToken)),
        map(() => this.accessToken)
      );
    }
  }

  updateToken(authResponse: AccessToken): void {
    this.tokenExpirationDate = addSeconds(new Date(), authResponse.expires_in);
    this.accessToken = authResponse.access_token;
  }

  getAccessToken(): string | undefined {
    return this.accessToken;
  }

  createAuthHeaders() {
    return this.hasValidAccessToken()
      ? new HttpHeaders({ Authorization: `Bearer ${this.getAccessToken()}` })
      : new HttpHeaders();
  }

  hasValidAccessToken(): boolean {
    return Boolean(this.accessToken) && !this.isTokenExpired();
  }

  private isTokenExpired(): boolean {
    return differenceInSeconds(this.tokenExpirationDate ?? new Date(), new Date()) < this.tokenRefreshOffset;
  }
}
