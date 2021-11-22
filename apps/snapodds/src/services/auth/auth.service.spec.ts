import { TestBed } from '@angular/core/testing';
import { authResponseMock } from '@response/mocks';
import { mock, MockProxy } from 'jest-mock-extended';
import { ApplicationConfigService } from '../config/application-config.service';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let applicationConfigService: MockProxy<ApplicationConfigService>;

  beforeEach(() => {
    applicationConfigService = mock<ApplicationConfigService>();

    TestBed.configureTestingModule({
      providers: [{ provide: ApplicationConfigService, useValue: applicationConfigService }],
    });

    service = TestBed.inject(AuthService);
  });

  describe('refreshAccessToken', () => {
    it('should return the existing accessToken when it is still valid', (done) => {
      service.updateToken(authResponseMock);

      service.refreshAccessToken().subscribe((accessToken) => {
        expect(accessToken).toBe(authResponseMock.access_token);
        expect(service.getAccessToken()).toBe(authResponseMock.access_token);
        done();
      });
    });

    it('should request token refresh if the existing accessToken is invalid', (done) => {
      service.refreshAccessToken().subscribe((accessToken) => {
        expect(applicationConfigService.emitTokenRefresh).toHaveBeenCalled();
        expect(accessToken).toBe(authResponseMock.access_token);
        done();
      });

      service.updateToken(authResponseMock);
    });
  });

  describe('hasValidAccessToken', () => {
    it('should have an valid access token', () => {
      service.updateToken(authResponseMock);

      expect(service.hasValidAccessToken()).toBe(true);
    });

    it('should initially have an invalid access token', () => {
      expect(service.hasValidAccessToken()).toBe(false);
    });

    it('should have an invalid token if expires is lower than 60 secs', () => {
      service.updateToken({ ...authResponseMock, expires_in: 5 });

      expect(service.hasValidAccessToken()).toBe(false);
    });
  });
});
