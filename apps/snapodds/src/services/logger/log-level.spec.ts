import { fromLogLevel, LogLevel, toLogLevel } from './log-level';

describe('LogLevel', () => {
  it('should map from string to logLevel', () => {
    expect(toLogLevel('debug')).toBe(LogLevel.DEBUG);
    expect(toLogLevel('info')).toBe(LogLevel.INFO);
    expect(toLogLevel('warn')).toBe(LogLevel.WARN);
    expect(toLogLevel('error')).toBe(LogLevel.ERROR);
    expect(toLogLevel('silent')).toBe(LogLevel.SILENT);
    expect(toLogLevel('unknown')).toBe(LogLevel.SILENT);
    expect(toLogLevel(undefined)).toBe(LogLevel.SILENT);
  });

  it('should map from logLevel to string', () => {
    expect(fromLogLevel(LogLevel.DEBUG)).toBe('debug');
    expect(fromLogLevel(LogLevel.INFO)).toBe('info');
    expect(fromLogLevel(LogLevel.WARN)).toBe('warn');
    expect(fromLogLevel(LogLevel.ERROR)).toBe('error');
    expect(fromLogLevel(LogLevel.SILENT)).toBe('silent');
  });
});
