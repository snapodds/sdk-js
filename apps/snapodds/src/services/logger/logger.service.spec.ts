import { TestBed } from '@angular/core/testing';
import { mock, MockProxy } from 'jest-mock-extended';
import { ApplicationConfigService } from '../config/application-config.service';
import { CONSOLE } from '../tokens/console-token';
import { LogLevel } from './log-level';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let loggerService: LoggerService;
  let applicationConfigService: MockProxy<ApplicationConfigService>;
  let console: MockProxy<Console>;

  beforeEach(() => {
    applicationConfigService = mock<ApplicationConfigService>();
    console = mock<Console>();

    TestBed.configureTestingModule({
      providers: [
        { provide: ApplicationConfigService, useValue: applicationConfigService },
        { provide: CONSOLE, useValue: console },
      ],
    });

    loggerService = TestBed.inject(LoggerService);
  });

  it('should call the according logLevels', () => {
    applicationConfigService.getLogLevel.mockReturnValue(LogLevel.DEBUG);

    loggerService.debug('DEBUG');
    expect(console.debug).toHaveBeenCalledWith('DEBUG');

    loggerService.info('INFO');
    expect(console.info).toHaveBeenCalledWith('INFO');

    loggerService.warn('WARN');
    expect(console.warn).toHaveBeenCalledWith('WARN');

    loggerService.error('ERROR');
    expect(console.error).toHaveBeenCalledWith('ERROR');
  });

  it('should respect the set logLevel as lower limit', () => {
    applicationConfigService.getLogLevel.mockReturnValue(LogLevel.WARN);

    loggerService.info('INFO');
    expect(console.info).not.toHaveBeenCalled();

    loggerService.warn('WARN');
    expect(console.warn).toHaveBeenCalledWith('WARN');
  });

  it('should always emit the loggerEvent regardless of the logLevel', () => {
    applicationConfigService.getLogLevel.mockReturnValue(LogLevel.WARN);

    loggerService.info('INFO');
    expect(applicationConfigService.emitLoggerEvent).toHaveBeenCalledWith(LogLevel.INFO, ['INFO']);

    loggerService.warn('WARN');
    expect(applicationConfigService.emitLoggerEvent).toHaveBeenCalledWith(LogLevel.WARN, ['WARN']);
  });

  it('should not log anything when set to silent', () => {
    applicationConfigService.getLogLevel.mockReturnValue(LogLevel.SILENT);

    loggerService.debug('DEBUG');
    loggerService.info('INFO');
    loggerService.warn('WARN');
    loggerService.error('ERROR');

    expect(console.debug).not.toHaveBeenCalled();
    expect(console.info).not.toHaveBeenCalled();
    expect(console.warn).not.toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();
  });
});
