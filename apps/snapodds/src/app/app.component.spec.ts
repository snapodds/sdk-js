import { EventEmitter } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { authResponseMock, sportEventTvSearchMock } from '@response/mocks';
import { mock, MockProxy } from 'jest-mock-extended';
import { ApplicationConfig } from '../config/application-config';
import { AuthService } from '../services/auth/auth.service';
import { ApplicationConfigService } from '../services/config/application-config.service';
import { LogLevel } from '../services/logger/log-level';
import { NotificationService } from '../services/notification/notification.service';
import { GoogleAnalyticsService } from '../services/tracking/google-analytics.service';
import { AppState, AppStateStore } from '../states/app-state.store';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let applicationConfigService: MockProxy<ApplicationConfigService>;
  let analyticsService: MockProxy<GoogleAnalyticsService>;
  let translateService: MockProxy<TranslateService>;
  let authService: MockProxy<AuthService>;
  let notificationService: MockProxy<NotificationService>;
  let appStateStore: MockProxy<AppStateStore>;

  beforeEach(async () => {
    applicationConfigService = mock<ApplicationConfigService>();
    analyticsService = mock<GoogleAnalyticsService>();
    translateService = mock<TranslateService>();
    authService = mock<AuthService>();
    notificationService = mock<NotificationService>();
    appStateStore = mock<AppStateStore>();

    TestBed.configureTestingModule({
      providers: [
        AppComponent,
        { provide: ApplicationConfigService, useValue: applicationConfigService },
        { provide: GoogleAnalyticsService, useValue: analyticsService },
        { provide: TranslateService, useValue: translateService },
        { provide: AuthService, useValue: authService },
        { provide: NotificationService, useValue: notificationService },
        { provide: AppStateStore, useValue: appStateStore },
      ],
    });

    component = TestBed.inject(AppComponent);
  });

  describe('init', () => {
    it('should populate the application config', () => {
      const applicationConfig: Partial<ApplicationConfig> = {
        logLevel: LogLevel.SILENT,
        closeEvent: new EventEmitter(),
        loggerEvent: new EventEmitter(),
        resultsEvent: new EventEmitter(),
        tokenRefreshEvent: new EventEmitter(),
      };

      component.ngOnInit();

      expect(applicationConfigService.setConfig).toHaveBeenCalledWith(applicationConfig);
    });

    it('should set the default language', () => {
      const lang = 'en';
      applicationConfigService.getLanguage.mockReturnValue(lang);

      component.ngOnInit();

      expect(translateService.use).toHaveBeenCalledWith(lang);
    });

    it('should trigger analytics for sdkInitialized', () => {
      component.ngOnInit();

      expect(analyticsService.sdkInitialized).toHaveBeenCalled();
    });

    it('should fetch token when application is initialized', (done) => {
      component.tokenRefresh.subscribe(() => done());
      component.ngOnInit();
    });
  });

  it('should clear snapOddsData when closed', () => {
    component.closeOddsView();

    expect(component.tvSearchResult).toBe(null);
  });

  it('setting the tokenResponse should call the authService to update the token', () => {
    component.tokenResponse = authResponseMock;

    expect(authService.updateToken).toHaveBeenCalledWith(authResponseMock);
  });

  it('setting the sportEvents should set the state to SHOW_ODDS', () => {
    component.tvSearchResult = sportEventTvSearchMock.resultEntries[0];

    expect(component.tvSearchResult).toBe(sportEventTvSearchMock.resultEntries[0]);
    expect(appStateStore.dispatch).toHaveBeenCalledWith(AppState.SHOW_ODDS);
  });
});
