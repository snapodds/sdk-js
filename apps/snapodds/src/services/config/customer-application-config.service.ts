import { Injectable } from '@angular/core';
import { Customer } from '@response/typings';
import { catchError, map, mapTo, Observable, of, ReplaySubject } from 'rxjs';
import { CustomersService } from '../api/customers.service';
import { ApplicationConfigService } from './application-config.service';
import { CustomerApplicationConfig } from './customer-application-config';

@Injectable({ providedIn: 'root' })
export class CustomerApplicationConfigService {
  private config?: CustomerApplicationConfig;

  private readonly config$ = new ReplaySubject<void>(1);
  readonly loaded$: Observable<boolean> = this.config$.asObservable().pipe(mapTo(true));

  constructor(
    private readonly applicationConfigService: ApplicationConfigService,
    private readonly customersService: CustomersService
  ) {}

  /**
   * Determines if autoSnap is enabled
   */
  isAutoSnapEnabled(): boolean {
    if (this.config?.autoSnapEnabled !== undefined && this.config?.autoSnapEnabled !== null) {
      return this.config.autoSnapEnabled;
    }

    return this.applicationConfigService.isAutoSnapEnabled();
  }

  /**
   * Returns the delay used to programmatically trigger a snap
   * @param withInitialDelay: the initial delay takes longer in order for the user to correctly align the camera
   */
  getAutoSnapInterval(withInitialDelay: boolean = false): number {
    if (this.config?.autoSnapMinInterval) {
      const initialDelay = withInitialDelay ? this.applicationConfigService.getAutoSnapInitialDelay() : 0;
      return this.config.autoSnapMinInterval + initialDelay;
    }

    return this.applicationConfigService.getAutoSnapInterval(withInitialDelay);
  }

  /**
   * Returns the number of max retries before the user has to perform a manual snap
   */
  getAutoSnapMaxRetries(): number {
    if (this.config?.autoSnapMaxTimeoutDuration) {
      return Math.ceil(this.config.autoSnapMaxTimeoutDuration / this.getAutoSnapInterval());
    }

    return this.applicationConfigService.getAutoSnapMaxRetries();
  }

  /**
   *  Returns the write key for the Segment Analytics.
   */
  getSegmentWriteKey(): string | undefined {
    return this.config?.segmentWriteKey;
  }

  /**
   * Loads the customer config and will always finish successfully
   * even if the http call fails to ensure that the application works
   * without customer settings
   */
  load(): void {
    if (this.config === undefined) {
      this.customersService
        .loadCustomer()
        .pipe(
          map(this.mapCustomerToConfig),
          catchError(() => of(undefined))
        )
        .subscribe((config) => {
          this.config = config;
          this.config$.next();
        });
    }
  }

  private mapCustomerToConfig(customer: Customer) {
    return {
      autoSnapEnabled: customer.autoSnapEnabled,
      autoSnapMinInterval: customer.autoSnapMinInterval,
      autoSnapMaxTimeoutDuration: customer.autoSnapMaxTimeoutDuration,
      segmentWriteKey: customer.segmentWriteKey,
    };
  }
}
