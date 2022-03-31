import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { customerMock } from '@response/mocks';
import { mock, MockProxy } from 'jest-mock-extended';
import { noop, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ApplicationConfigService } from '../config/application-config.service';
import { LoggerService } from '../logger/logger.service';

import { CustomersService } from './customers.service';

describe('CustomersService', () => {
  const apiUrl = 'API_URL';

  let service: CustomersService;
  let http: HttpTestingController;
  let logger: MockProxy<LoggerService>;
  let authService: MockProxy<AuthService>;
  let applicationConfigService: MockProxy<ApplicationConfigService>;

  beforeEach(() => {
    logger = mock<LoggerService>();
    authService = mock<AuthService>();
    applicationConfigService = mock<ApplicationConfigService>();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: LoggerService, useValue: logger },
        { provide: AuthService, useValue: authService },
        { provide: ApplicationConfigService, useValue: applicationConfigService },
      ],
    });
    service = TestBed.inject(CustomersService);
    http = TestBed.inject(HttpTestingController);

    applicationConfigService.getApiUrl.mockReturnValue(apiUrl);
    authService.requestAccessToken.mockReturnValue(of('ACCESS_TOKEN'));
  });

  it('should return the apiUrl from the application config', () => {
    expect(service.baseUrl).toBe(apiUrl);
  });

  it('should load the customer successfully', (done) => {
    service.loadCustomer().subscribe((response) => {
      expect(response).toBe(customerMock);
      done();
    });

    const httpRequest = http.expectOne(`${service.baseUrl}/customers/me`);
    httpRequest.flush(customerMock);

    const { headers } = httpRequest.request;
    expect(headers.get('Authorization')).toBe('Bearer ACCESS_TOKEN');
  });

  it('should write an error if the customer loading failed', (done) => {
    const customerId = 1;
    const statusText = 'Internal Server Error';

    service.loadCustomer(customerId).subscribe({
      next: noop,
      error: (error) => {
        expect(error.statusText).toBe(statusText);
        expect(logger.error).toHaveBeenCalledWith(`Failed to load customer for id '${customerId}'`);
        done();
      },
    });

    const httpRequest = http.expectOne(`${service.baseUrl}/customers/${customerId}`);
    httpRequest.flush(null, { status: 500, statusText: 'Internal Server Error' });
  });

  afterAll(() => {
    http.verify();
  });
});
