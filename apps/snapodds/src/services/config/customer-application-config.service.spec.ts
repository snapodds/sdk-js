import { TestBed } from '@angular/core/testing';
import { customerMock } from '@response/mocks';
import { mock, MockProxy } from 'jest-mock-extended';
import { of, throwError } from 'rxjs';
import { CustomersService } from '../api/customers.service';
import { ApplicationConfigService } from './application-config.service';

import { CustomerApplicationConfigService } from './customer-application-config.service';

describe('CustomerApplicationConfigService', () => {
  let customerConfigService: CustomerApplicationConfigService;
  let customersService: MockProxy<CustomersService>;
  let applicationConfigService: MockProxy<ApplicationConfigService>;

  beforeEach(() => {
    customersService = mock<CustomersService>();
    applicationConfigService = mock<ApplicationConfigService>();

    TestBed.configureTestingModule({
      providers: [
        { provide: CustomersService, useValue: customersService },
        { provide: ApplicationConfigService, useValue: applicationConfigService },
      ],
    });

    customerConfigService = TestBed.inject(CustomerApplicationConfigService);
  });

  it('should load the customer', () => {
    customersService.loadCustomer.mockReturnValue(of(customerMock));
    customerConfigService.load();

    const maxRetries = customerMock.autoSnapMaxTimeoutDuration / customerMock.autoSnapMinInterval;

    expect(customerConfigService.getAutoSnapMaxRetries()).toBe(maxRetries);
    expect(customerConfigService.isAutoSnapEnabled()).toBe(customerMock.autoSnapEnabled);
    expect(customerConfigService.getAutoSnapInterval()).toBe(customerMock.autoSnapMinInterval);
  });

  describe('fallback to application config', () => {
    beforeEach(() => {
      customersService.loadCustomer.mockReturnValue(throwError('Could not load customer'));
    });

    it('should get `autoSnapEnabled` from application config', () => {
      applicationConfigService.isAutoSnapEnabled.mockReturnValue(false);

      customerConfigService.load();

      expect(customerConfigService.isAutoSnapEnabled()).toBe(false);
    });

    it('should get `autoSnapMinInterval` from application config', () => {
      applicationConfigService.getAutoSnapInterval.mockReturnValue(1000);

      customerConfigService.load();

      expect(customerConfigService.getAutoSnapInterval()).toBe(1000);
    });

    it('should get `autoSnapMaxTimeoutDuration` from application config', () => {
      applicationConfigService.getAutoSnapMaxRetries.mockReturnValue(5);

      customerConfigService.load();

      expect(customerConfigService.getAutoSnapMaxRetries()).toBe(5);
    });
  });
});
