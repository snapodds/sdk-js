import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mock, MockProxy } from 'jest-mock-extended';
import { of } from 'rxjs';
import * as UAParser from 'ua-parser-js';
import { IBrowser, IDevice, IEngine, IOS } from 'ua-parser-js';
import { environment } from '../../../environments/environment';
import { CustomerApplicationConfigService } from '../../config/customer-application-config.service';
import { SdkMode } from '../../config/sdk-mode';
import { LoggerService } from '../../logger/logger.service';
import { STORAGE } from '../../tokens/storage-token';
import { UA_PARSER } from '../../tokens/ua-parser-token';
import { AnalyticsEventType } from '../analytics-event-type';
import { SnapViewSnapResultProperties } from '../snap-view-snap-result-properties';
import { SegmentAnalyticsService } from './segment-analytics.service';
import { SegmentTrackEvent } from './segment-track-event';

describe('SegmentAnalyticsService', () => {
  let service: SegmentAnalyticsService;
  let logger: MockProxy<LoggerService>;
  let uaParser: MockProxy<UAParser>;
  let storage: MockProxy<Storage>;
  let httpClient: MockProxy<HttpClient>;
  let customerApplicationConfigService: MockProxy<CustomerApplicationConfigService>;

  const osInfo: IOS = { name: 'OSX', version: '10.15' };
  const browserInfo: IBrowser = { name: 'Chrome', version: '19.0.1084.60', major: undefined };
  const engineInfo: IEngine = { name: 'WebKit', version: '534.46.0' };
  const deviceInfo: IDevice = { model: 'iPhone', vendor: 'Apple', type: 'mobile' };
  const anonymousId = 'V1StGXR8_Z5jdHi6B-myT';

  beforeEach(() => {
    logger = mock<LoggerService>();
    uaParser = mock<UAParser>();
    httpClient = mock<HttpClient>();
    storage = mock<Storage>();
    customerApplicationConfigService = mock<CustomerApplicationConfigService>();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SegmentAnalyticsService,
        { provide: LoggerService, useValue: logger },
        { provide: UA_PARSER, useValue: uaParser },
        { provide: STORAGE, useValue: storage },
        { provide: CustomerApplicationConfigService, useValue: customerApplicationConfigService },
        { provide: HttpClient, useValue: httpClient },
      ],
    });

    service = TestBed.inject(SegmentAnalyticsService);
    uaParser.getDevice.mockReturnValue(deviceInfo);
    uaParser.getOS.mockReturnValue(osInfo);
    uaParser.getBrowser.mockReturnValue(browserInfo);
    uaParser.getEngine.mockReturnValue(engineInfo);

    jest.useFakeTimers().setSystemTime(Date.now());
  });

  it('should track an event when writeKey is available', () => {
    const writeKey = 'ABCDEF-12345';
    const headers = { Authorization: `Basic ${btoa(`${writeKey}:`)}` };

    customerApplicationConfigService.getSegmentWriteKey.mockReturnValue(writeKey);
    storage.getItem.mockReturnValue(anonymousId);
    httpClient.post.mockReturnValue(of());

    const properties: SnapViewSnapResultProperties = {
      duration: 10,
      autosnap: true,
      request: 'REQUEST',
      scores: [1, 2, 3],
      results: [10, 20, 30],
      mode: SdkMode.SPORTMEDIA,
    };

    service.snapViewSnapResult(properties);

    const eventData: SegmentTrackEvent = {
      event: AnalyticsEventType.SNAP_WITH_RESULT,
      anonymousId,
      context: {
        library: {
          name: 'sdk-web',
          version: environment.sdkVersion,
        },
        os: {
          name: osInfo.name,
          version: osInfo.version,
        },
        browser: {
          name: browserInfo.name,
          version: browserInfo.version,
        },
        device: {
          name: deviceInfo.model,
          manufacturer: deviceInfo.vendor,
          type: deviceInfo.type,
        },
        engine: {
          name: engineInfo.name,
          version: engineInfo.version,
        },
      },
      properties,
      timestamp: new Date().toISOString(),
    };

    expect(httpClient.post).toHaveBeenCalledWith(`${service.serviceUrl}`, eventData, { headers });
  });

  it('should not track an event when writeKey is not available', () => {
    service.snapViewOpened();

    expect(httpClient.post).not.toHaveBeenCalled();
  });
});
