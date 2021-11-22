/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing';
import { mock, MockProxy } from 'jest-mock-extended';
import { LoggerService } from '../logger/logger.service';
import { GoogleAnalyticsService } from './google-analytics.service';

describe('GoogleAnalyticsService', () => {
  let service: GoogleAnalyticsService;
  let logger: MockProxy<LoggerService>;

  beforeEach(() => {
    logger = mock<LoggerService>();

    TestBed.configureTestingModule({
      providers: [{ provide: LoggerService, useValue: logger }],
    });

    service = TestBed.inject(GoogleAnalyticsService);

    delete (global as any).gtag;
    delete (global as any).ga;
  });

  [
    { method: 'sdkInitialized', action: 'SnapSdkInit' },
    { method: 'snapViewOpened', action: 'SnapViewOpen' },
    { method: 'snapViewSnap', action: 'SnapViewSnap' },
    { method: 'snapViewSnapResult', action: 'SnapViewSnapResult', duration: 10 },
    { method: 'snapViewSnapFailed', action: 'SnapViewSnapFail', duration: 10 },
    { method: 'snapViewSnapNegative', action: 'SnapViewSnapNegative', duration: 10 },
    { method: 'snapViewClosed', action: 'SnapViewClose' },
  ].forEach(({ method, action, duration }) => {
    it(`should track '${action}' event`, () => {
      (service as any)[method](duration);
      expect(logger.info).toHaveBeenCalledWith('Tracked event', {
        eventCategory: service.category,
        eventAction: action,
        eventLabel: service.label,
        eventValue: duration,
      });
    });
  });

  it('should detect google analytics', () => {
    const ga = jest.fn();
    (global as any).ga = ga;

    service.sdkInitialized();

    expect(ga).toHaveBeenCalledWith('send', {
      hitType: 'pageview',
      transport: 'beacon',
      page: `/${service.category}/${service.label}/SnapSdkInit`,
      title: `${service.category}: SnapSdkInit`,
    });
  });

  it('should detect google tag manager', () => {
    const gtag = jest.fn();
    (global as any).gtag = gtag;

    service.sdkInitialized();

    expect(gtag).toHaveBeenCalledWith('event', 'page_view', {
      page_path: `/${service.category}/${service.label}/SnapSdkInit`,
      page_title: `${service.category}: SnapSdkInit`,
    });
  });

  it('should log to default logger if an error has occurred', () => {
    const message = 'loggingFailed';

    logger.info.mockImplementation(() => {
      throw message;
    });

    service.sdkInitialized();

    expect(logger.error).toHaveBeenCalledWith('Failed to track event', message);
  });
});
