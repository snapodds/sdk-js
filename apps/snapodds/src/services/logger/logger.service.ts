/* eslint-disable no-restricted-syntax */

import { Inject, Injectable } from '@angular/core';
import { ApplicationConfigService } from '../config/application-config.service';
import { CONSOLE } from '../tokens/console-token';
import { LogLevel } from './log-level';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor(
    private readonly applicationConfigService: ApplicationConfigService,
    @Inject(CONSOLE) private readonly console: Console
  ) {}

  debug(...data: unknown[]): void {
    this.log(LogLevel.DEBUG, ...data);
  }

  error(...data: unknown[]): void {
    this.log(LogLevel.ERROR, ...data);
  }

  warn(...data: unknown[]): void {
    this.log(LogLevel.WARN, ...data);
  }

  info(...data: unknown[]): void {
    this.log(LogLevel.INFO, ...data);
  }

  private log(logLevel: LogLevel, ...data: unknown[]): void {
    if (this.isAboveLogLevel(logLevel)) {
      switch (logLevel) {
        case LogLevel.DEBUG:
          this.console.debug(...data);
          break;
        case LogLevel.INFO:
          this.console.info(...data);
          break;
        case LogLevel.WARN:
          this.console.warn(...data);
          break;
        case LogLevel.ERROR:
          this.console.error(...data);
          break;
      }
    }
    this.applicationConfigService.emitLoggerEvent(logLevel, data);
  }

  private isAboveLogLevel(logLevel: LogLevel): boolean {
    return logLevel >= this.applicationConfigService.getLogLevel();
  }
}
