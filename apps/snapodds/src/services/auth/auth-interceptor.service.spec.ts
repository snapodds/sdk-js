import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { mock, MockProxy } from 'jest-mock-extended';
import { AuthHttpInterceptor } from './auth-interceptor.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthHttpInterceptorTestingService {
  readonly url = `http://localhost/test`;

  constructor(private readonly http: HttpClient) {}

  getTestData() {
    return this.http.get<unknown>(this.url);
  }
}

describe('AuthHttpInterceptor', () => {
  let service: AuthHttpInterceptorTestingService;
  let httpTestingController: HttpTestingController;
  let authService: MockProxy<AuthService>;

  beforeEach(() => {
    authService = mock<AuthService>();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthHttpInterceptorTestingService,
        { provide: AuthService, useValue: authService },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthHttpInterceptor,
          multi: true,
        },
      ],
    });

    service = TestBed.inject(AuthHttpInterceptorTestingService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should add the access token to the response headers', () => {
    authService.hasValidAccessToken.mockReturnValue(true);

    service.getTestData().subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpTestingController.expectOne(service.url);
    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
  });

  it('should omit access token if invalid from the response headers', () => {
    authService.hasValidAccessToken.mockReturnValue(false);

    service.getTestData().subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpTestingController.expectOne(service.url);
    expect(httpRequest.request.headers.has('Authorization')).toEqual(false);
  });
});
