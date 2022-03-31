import { Injectable } from '@angular/core';
import { AccessToken, TvSearchResultEntry } from '@response/typings';
import { noop } from 'rxjs';
import { ApplicationConfig } from '../../config/application-config';
import { fromLogLevel, LogLevel } from '../logger/log-level';

/**
 * Default application configuration
 */
const DEFAULT_APPLICATION_CONFIG: ApplicationConfig = {
  apiUrl: 'https://api.us.snapscreen.com',
  language: 'en',
  autoSnap: false,
  logLevel: LogLevel.SILENT,
  vibrate: false,
  logCallback: noop,
  closeCallback: noop,
  resultsCallback: noop,
  accessTokenProvider: () => Promise.reject('No accessTokenProvider specified'),
};

@Injectable({ providedIn: 'root' })
export class ApplicationConfigService {
  private config: ApplicationConfig = DEFAULT_APPLICATION_CONFIG;

  private readonly SNAP_MAX_DIMENSION = 1024;
  private readonly AUTOSNAP_MAX_DIMENSION = 512;
  private readonly AUTOSNAP_INITIAL_DELAY = 1500;
  private readonly AUTOSNAP_INTERVAL = 1000;
  private readonly AUTOSNAP_MAX_INTERVAL = 5000;

  /**
   * Merges the given applicationConfig with the default values.
   * @param applicationConfig
   */
  setConfig(applicationConfig: Partial<ApplicationConfig>): void {
    this.config = { ...this.config, ...this.omitUndefinedProperties(applicationConfig) };
  }

  /**
   * Filter out entries which values are undefined
   * @param config
   * @private
   */
  private omitUndefinedProperties(config: Partial<ApplicationConfig>): Partial<ApplicationConfig> {
    return Object.entries(config).reduce(
      (acc, [key, value]) => (value === undefined ? acc : { ...acc, [key]: value }),
      {}
    );
  }

  /**
   * Returns the accessTokenProvider callback
   */
  get accessTokenProvider(): () => Promise<AccessToken> {
    return this.config.accessTokenProvider;
  }

  /**
   * Determines if autoSnap is enabled
   */
  isAutoSnapEnabled(): boolean {
    return this.config.autoSnap;
  }

  /**
   * Returns the dimension for resizing an image based on the autoSnap mode
   */
  getSnapDimension(): number {
    return this.isAutoSnapEnabled() ? this.AUTOSNAP_MAX_DIMENSION : this.SNAP_MAX_DIMENSION;
  }

  /**
   * Returns the delay used to programmatically trigger a snap
   * @param withInitialDelay: the initial delay takes longer in order for the user to correctly align the camera
   */
  getAutoSnapInterval(withInitialDelay: boolean = false): number {
    return this.AUTOSNAP_INTERVAL + (withInitialDelay ? this.AUTOSNAP_INITIAL_DELAY : 0);
  }

  /**
   * Returns the initial delay before the webcam has been pointed on the tv
   */
  getAutoSnapInitialDelay(): number {
    return this.AUTOSNAP_INITIAL_DELAY;
  }

  /**
   * Returns the number of max retries before the user has to perform a manual snap
   */
  getAutoSnapMaxRetries(): number {
    return Math.ceil(this.AUTOSNAP_MAX_INTERVAL / this.AUTOSNAP_INTERVAL);
  }

  /**
   * Returns the configured language
   */
  getLanguage(): string {
    return this.config.language;
  }

  /**
   * Returns the configured logLevel
   */
  getLogLevel(): LogLevel {
    return this.config.logLevel;
  }

  /**
   * Returns the apiUrl to perform the search of SportEvents and loading of LineOdds against
   */
  getApiUrl(): string {
    return this.config.apiUrl;
  }

  /**
   * Triggers the logger event on the corresponding callback
   * @param logLevel
   * @param data
   */
  emitLoggerEvent(logLevel: LogLevel, data: unknown[]): void {
    this.config.logCallback(fromLogLevel(logLevel), data);
  }

  /**
   * Triggers the closeEvent callback
   */
  emitCloseEvent(): void {
    this.config.closeCallback();
  }

  /**
   * Triggers the resultCallback with the given TvSearchResultEntry
   * @param resultEntry
   */
  emitResultsEvent(resultEntry: TvSearchResultEntry): void {
    this.config.resultsCallback(resultEntry);
  }

  /**
   * Determines if the device should vibrate if a match has been found or not
   */
  isVibrateEnabled(): boolean {
    return this.config.vibrate;
  }
}
