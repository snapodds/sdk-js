import { Injectable } from '@angular/core';
import { AccessToken } from '@response/typings';
import { addSeconds, differenceInSeconds } from 'date-fns';
import { Observable, of, Subject, take } from 'rxjs';
import { ApplicationConfigService } from '../config/application-config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessToken?: string;
  private tokenExpirationDate?: Date;

  private readonly accessTokenUpdated: Subject<string> = new Subject();
  private readonly tokenRefreshOffset = 60;

  constructor(private readonly applicationConfigService: ApplicationConfigService) {}

  updateToken(authResponse: AccessToken): void {
    this.tokenExpirationDate = addSeconds(new Date(), authResponse.expires_in);
    this.accessToken = authResponse.access_token;
    this.accessTokenUpdated.next(this.accessToken);
  }

  refreshAccessToken(): Observable<string | undefined> {
    if (this.hasValidAccessToken()) {
      return of(this.accessToken);
    } else {
      this.applicationConfigService.emitTokenRefresh();
      return this.accessTokenUpdated.pipe(take(1));
    }
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
