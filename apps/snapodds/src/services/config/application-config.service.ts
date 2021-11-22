import { EventEmitter, Injectable } from '@angular/core';
import { SportEventsResponse } from '@response/typings';
import { ApplicationConfig } from '../../config/application-config';
import { fromLogLevel, LogLevel } from '../logger/log-level';
import { LoggerEvent } from '../logger/logger-event';

const DEFAULT_APPLICATION_CONFIG: ApplicationConfig = {
  apiUrl: 'https://api.us.snapscreen.com',
  language: 'en',
  autoSnap: false,
  logLevel: LogLevel.SILENT,
  vibrate: false,
  tokenRefreshEvent: new EventEmitter<void>(),
  loggerEvent: new EventEmitter<LoggerEvent>(),
  closeEvent: new EventEmitter<void>(),
  resultsEvent: new EventEmitter<SportEventsResponse>(),
};

@Injectable({ providedIn: 'root' })
export class ApplicationConfigService {
  private config: ApplicationConfig = DEFAULT_APPLICATION_CONFIG;

  private readonly SNAP_MAX_DIMENSION = 1024;
  private readonly AUTOSNAP_MAX_DIMENSION = 512;
  private readonly AUTOSNAP_DELAY_INITIAL = 2500;
  private readonly AUTOSNAP_DELAY = 1000;

  setConfig(applicationConfig: Partial<ApplicationConfig>): void {
    this.config = { ...DEFAULT_APPLICATION_CONFIG, ...this.omitUndefinedProperties(applicationConfig) };
  }

  private omitUndefinedProperties(config: Partial<ApplicationConfig>): Partial<ApplicationConfig> {
    return Object.entries(config).reduce(
      (acc, [key, value]) => (value === undefined ? acc : { ...acc, [key]: value }),
      {}
    );
  }

  isAutoSnapEnabled(): boolean {
    return this.config.autoSnap;
  }

  getSnapDimension(): number {
    return this.isAutoSnapEnabled() ? this.AUTOSNAP_MAX_DIMENSION : this.SNAP_MAX_DIMENSION;
  }

  getAutoSnapDelay(initial: boolean = false): number {
    return initial ? this.AUTOSNAP_DELAY_INITIAL : this.AUTOSNAP_DELAY;
  }

  getLanguage(): string {
    return this.config.language;
  }

  getLogLevel(): LogLevel {
    return this.config.logLevel;
  }

  getApiUrl(): string {
    return this.config.apiUrl;
  }

  emitTokenRefresh(): void {
    this.config.tokenRefreshEvent.emit();
  }

  emitLoggerEvent(logLevel: LogLevel, data: unknown[]): void {
    this.config.loggerEvent.emit({ logLevel: fromLogLevel(logLevel), data });
  }

  emitCloseEvent(): void {
    this.config.closeEvent.emit();
  }

  emitResultsEvent(response: SportEventsResponse): void {
    this.config.resultsEvent.emit(response);
  }

  isVibrateEnabled(): boolean {
    return this.config.vibrate;
  }
}
