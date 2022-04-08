import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { sportEventTvSearchMock } from '@response/mocks';
import { mock, MockProxy } from 'jest-mock-extended';
import { AuthService } from '../services/auth/auth.service';
import { ApplicationConfig } from '../services/config/application-config';
import { ApplicationConfigService } from '../services/config/application-config.service';
import { toLogLevel } from '../services/logger/log-level';
import { NotificationService } from '../services/notification/notification.service';
import { AnalyticsService } from '../services/tracking/analytics.service';
import { AppState, AppStateStore } from '../states/app-state.store';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let applicationConfigService: MockProxy<ApplicationConfigService>;
  let analyticsService: MockProxy<AnalyticsService>;
  let translateService: MockProxy<TranslateService>;
  let authService: MockProxy<AuthService>;
  let notificationService: MockProxy<NotificationService>;
  let appStateStore: MockProxy<AppStateStore>;

  beforeEach(async () => {
    applicationConfigService = mock<ApplicationConfigService>();
    analyticsService = mock<AnalyticsService>();
    translateService = mock<TranslateService>();
    authService = mock<AuthService>();
    notificationService = mock<NotificationService>();
    appStateStore = mock<AppStateStore>();

    TestBed.configureTestingModule({
      providers: [
        AppComponent,
        { provide: ApplicationConfigService, useValue: applicationConfigService },
        { provide: AnalyticsService, useValue: analyticsService },
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
      const closeCallback = jest.fn();
      const logCallback = jest.fn();
      const resultsCallback = jest.fn();
      const accessTokenProvider = jest.fn();

      const apiUrl = 'http://example.org';
      const autoSnap = true;
      const autoSnapInitialDelay = 500;
      const autoSnapInterval = 600;
      const autoSnapMaxInterval = 12000;
      const language = 'en';
      const logLevel = 'info';
      const vibrate = true;

      const applicationConfig: Partial<ApplicationConfig> = {
        closeCallback,
        logCallback,
        resultsCallback,
        accessTokenProvider,
        apiUrl,
        autoSnap,
        autoSnapInitialDelay,
        autoSnapInterval,
        autoSnapMaxInterval,
        language,
        logLevel: toLogLevel(logLevel),
        vibrate,
      };

      component.closeCallback = closeCallback;
      component.logCallback = logCallback;
      component.resultsCallback = resultsCallback;
      component.accessTokenProvider = accessTokenProvider;

      component.apiUrl = apiUrl;
      component.autoSnap = autoSnap;
      component.autoSnapInitialDelay = autoSnapInitialDelay;
      component.autoSnapInterval = autoSnapInterval;
      component.autoSnapMaxInterval = autoSnapMaxInterval;
      component.language = language;
      component.logLevel = logLevel;
      component.vibrate = vibrate;

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
  });

  it('should clear snapOddsData when closed', () => {
    component.closeOddsView();

    expect(component.tvSearchResult).toBe(null);
  });

  it('setting the sportEvents should set the state to SHOW_ODDS', () => {
    component.tvSearchResult = sportEventTvSearchMock.resultEntries[0];

    expect(component.tvSearchResult).toBe(sportEventTvSearchMock.resultEntries[0]);
    expect(appStateStore.dispatch).toHaveBeenCalledWith(AppState.SHOW_ODDS);
  });
});
