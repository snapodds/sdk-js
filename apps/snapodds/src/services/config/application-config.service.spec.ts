import { sportEventTvSearchMock } from '@response/mocks';
import { LogLevel } from '../logger/log-level';
import { ApplicationConfigService } from './application-config.service';

describe('ApplicationConfig', () => {
  let service: ApplicationConfigService;

  beforeEach(() => {
    service = new ApplicationConfigService();
  });

  it('should provide getters for the config values', () => {
    const apiUrl = 'https://example.com';
    const language = 'de';
    const logLevel = LogLevel.INFO;
    const vibrate = true;

    service.setConfig({
      apiUrl,
      language,
      logLevel,
      vibrate,
    });

    expect(service.getApiUrl()).toBe(apiUrl);
    expect(service.getLanguage()).toBe(language);
    expect(service.getLogLevel()).toBe(logLevel);
    expect(service.isVibrateEnabled()).toBe(vibrate);
  });

  it('should emit the events accordingly', () => {
    const accessTokenProvider = jest.fn();
    const closeCallback = jest.fn();
    const logCallback = jest.fn();
    const resultsCallback = jest.fn();

    service.setConfig({
      accessTokenProvider,
      closeCallback,
      logCallback,
      resultsCallback,
    });

    service.accessTokenProvider();
    service.emitCloseEvent();
    service.emitLoggerEvent(LogLevel.INFO, ['INFO']);
    service.emitResultsEvent(sportEventTvSearchMock.resultEntries[0]);

    expect(accessTokenProvider).toHaveBeenCalled();
    expect(closeCallback).toHaveBeenCalled();
    expect(logCallback).toHaveBeenCalledWith('info', ['INFO']);
    expect(resultsCallback).toHaveBeenCalledWith(sportEventTvSearchMock.resultEntries[0]);
  });

  describe('autoSnap', () => {
    it('should set act on autoSnap enabled/disabled', () => {
      const SNAP_MAX_DIMENSION = 1024;
      const AUTOSNAP_MAX_DIMENSION = 512;

      service.setConfig({ autoSnap: false });
      expect(service.isAutoSnapEnabled()).toBe(false);
      expect(service.getSnapDimension()).toBe(SNAP_MAX_DIMENSION);

      service.setConfig({ autoSnap: true });
      expect(service.isAutoSnapEnabled()).toBe(true);
      expect(service.getSnapDimension()).toBe(AUTOSNAP_MAX_DIMENSION);
    });

    it('should return different delays based on he status', () => {
      expect(service.getAutoSnapInterval()).toBe(1000);
      expect(service.getAutoSnapInterval(true)).toBe(2500);
    });

    it('should use configured autoSnap interval', () => {
      expect(service.getAutoSnapInterval()).toBe(1000);
      expect(service.getAutoSnapInterval(true)).toBe(2500);

      service.setConfig({ autoSnapInterval: 2000 });

      expect(service.getAutoSnapInterval()).toBe(2000);
      expect(service.getAutoSnapInterval(true)).toBe(3500);
    });

    it('should use configured autoSnap initial delay', () => {
      expect(service.getAutoSnapInterval()).toBe(1000);
      expect(service.getAutoSnapInterval(true)).toBe(2500);

      service.setConfig({ autoSnapInitialDelay: 500 });

      expect(service.getAutoSnapInterval()).toBe(1000);
      expect(service.getAutoSnapInterval(true)).toBe(1500);
    });

    it('should use configured autoSnap max interval', () => {
      expect(service.getAutoSnapMaxRetries()).toBe(5);

      service.setConfig({ autoSnapMaxInterval: 60000 });

      expect(service.getAutoSnapMaxRetries()).toBe(60);
    });
  });

  describe('autoSnapMaxRetries', () => {
    it('should calculate the maxRetries based on the min and max intervals', () => {
      expect(service.getAutoSnapMaxRetries()).toBe(5);
    });
  });
});
