import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forwardRef, Inject, Injectable } from '@angular/core';
import { Customer } from '@response/typings';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ApplicationConfigService } from '../config/application-config.service';
import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(
    private readonly http: HttpClient,
    private readonly logger: LoggerService,
    private readonly authService: AuthService,
    @Inject(forwardRef(() => ApplicationConfigService))
    private readonly applicationConfigService: ApplicationConfigService
  ) {}

  /**
   * Retrieve the apiUrl from the applicationConfig
   */
  get baseUrl(): string {
    return this.applicationConfigService.getApiUrl();
  }

  /**
   * Retrieves a customer by id. If none is provided the currently loggedIn customer is returned
   * @param id
   */
  loadCustomer(id: number | string = 'me'): Observable<Customer> {
    return this.authService.requestAccessToken().pipe(
      switchMap((accessToken) =>
        this.http.get<Customer>(`${this.baseUrl}/customers/${id}`, {
          headers: new HttpHeaders({ Authorization: `Bearer ${accessToken}` }),
        })
      ),
      catchError((error) => {
        this.logger.error(`Failed to load customer for id '${id}'`);
        return throwError(error);
      })
    );
  }
}
