import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AnalyticsEventType } from './analytics-event-type';
import { AnalyticsProperties } from './analytics-properties';
import { AnalyticsService } from './analytics.service';
import { SnapOddsOpenProperties } from './snap-odds-open-properties';
import { SnapViewSnapFailedProperties } from './snap-view-snap-failed-properties';
import { SnapViewSnapResultProperties } from './snap-view-snap-result-properties';
import { SnapViewSnapWithoutResultProperties } from './snap-view-snap-without-result-properties';

@Injectable()
class TestingAnalyticsService extends AnalyticsService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  trackEvent(event: AnalyticsEventType, properties?: AnalyticsProperties): void {}
}

describe('AnalyticsService', () => {
  let service: TestingAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestingAnalyticsService],
    });

    service = TestBed.inject(TestingAnalyticsService);
  });

  const snapViewSnapFailedProperties: SnapViewSnapFailedProperties = {
    http_status_code: 500,
    status_code: 500,
    status_message: 'Internal Server Error',
    duration: 10,
    autosnap: true,
    request: 'REQUEST',
  };

  const snapViewSnapResultProperties: SnapViewSnapResultProperties = {
    autosnap: false,
    duration: 0,
    request: 'REQUEST',
    results: [10, 20, 30],
    scores: [1, 2, 3],
  };

  const snapViewSnapWithoutResultProperties: SnapViewSnapWithoutResultProperties = {
    autosnap: false,
    duration: 0,
    request: '',
  };

  const snapOddsOpenProperties: SnapOddsOpenProperties = { sportevent_id: 0 };

  it.each`
    method                         | eventType                                 | properties
    ${'sdkInitialized'}            | ${AnalyticsEventType.SDK_INIT}            | ${undefined}
    ${'snapViewClosed'}            | ${AnalyticsEventType.SNAP_CLOSE}          | ${undefined}
    ${'snapViewOpened'}            | ${AnalyticsEventType.SNAP_OPEN}           | ${undefined}
    ${'snapViewSnap'}              | ${AnalyticsEventType.MANUAL_SNAP}         | ${undefined}
    ${'snapViewSnapFailed'}        | ${AnalyticsEventType.SNAP_FAILED}         | ${snapViewSnapFailedProperties}
    ${'snapViewSnapResult'}        | ${AnalyticsEventType.SNAP_WITH_RESULT}    | ${snapViewSnapResultProperties}
    ${'snapViewSnapWithoutResult'} | ${AnalyticsEventType.SNAP_WITHOUT_RESULT} | ${snapViewSnapWithoutResultProperties}
    ${'snapOddsOpen'}              | ${AnalyticsEventType.ODDS_OPEN}           | ${snapOddsOpenProperties}
  `(
    'should track an event',
    ({
      method,
      eventType,
      properties,
    }: {
      method: string;
      eventType: AnalyticsEventType;
      properties: AnalyticsEventType;
    }) => {
      jest.spyOn(service, 'trackEvent');

      (service as any)[method].call(service, properties);

      if (properties) {
        expect(service.trackEvent).toHaveBeenCalledWith(eventType, properties);
      } else {
        expect(service.trackEvent).toHaveBeenCalledWith(eventType);
      }
    }
  );
});
