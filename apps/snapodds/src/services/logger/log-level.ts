export enum LogLevel {
  DEBUG,
  INFO,
  WARN,
  ERROR,
  SILENT,
}

export function toLogLevel(logLevel: string | undefined): LogLevel {
  switch (logLevel?.toLocaleLowerCase()) {
    case 'debug':
      return LogLevel.DEBUG;
    case 'info':
      return LogLevel.INFO;
    case 'warn':
      return LogLevel.WARN;
    case 'error':
      return LogLevel.ERROR;
    default:
      return LogLevel.SILENT;
  }
}

export function fromLogLevel(logLevel: LogLevel): string {
  switch (logLevel) {
    case LogLevel.DEBUG:
      return 'debug';
    case LogLevel.INFO:
      return 'info';
    case LogLevel.WARN:
      return 'warn';
    case LogLevel.ERROR:
      return 'error';
    case LogLevel.SILENT:
      return 'silent';
  }
}
