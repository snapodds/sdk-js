import { EventEmitter } from '@angular/core';
import { TvSearchResult } from '@response/typings';
import { LogLevel } from '../services/logger/log-level';
import { LoggerEvent } from '../services/logger/logger-event';

export interface ApplicationConfig {
  apiUrl: string;
  autoSnap: boolean;
  language: string;
  vibrate: boolean;
  logLevel: LogLevel;
  tokenRefreshEvent: EventEmitter<void>;
  loggerEvent: EventEmitter<LoggerEvent>;
  closeEvent: EventEmitter<void>;
  resultsEvent: EventEmitter<TvSearchResult>;
}
