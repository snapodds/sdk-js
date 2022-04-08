import { AnalyticsEventType } from './analytics-event-type';
import { AnalyticsProperties } from './analytics-properties';
import { SnapOddsOpenProperties } from './snap-odds-open-properties';
import { SnapViewSnapFailedProperties } from './snap-view-snap-failed-properties';
import { SnapViewSnapResultProperties } from './snap-view-snap-result-properties';
import { SnapViewSnapWithoutResultProperties } from './snap-view-snap-without-result-properties';

export abstract class AnalyticsService {
  protected abstract trackEvent(event: AnalyticsEventType, properties?: AnalyticsProperties): void;

  sdkInitialized(): void {
    this.trackEvent(AnalyticsEventType.SDK_INIT);
  }

  snapViewClosed(): void {
    this.trackEvent(AnalyticsEventType.SNAP_CLOSE);
  }

  snapViewOpened(): void {
    this.trackEvent(AnalyticsEventType.SNAP_OPEN);
  }

  snapViewSnap(): void {
    this.trackEvent(AnalyticsEventType.MANUAL_SNAP);
  }

  snapViewSnapFailed(properties: SnapViewSnapFailedProperties): void {
    this.trackEvent(AnalyticsEventType.SNAP_FAILED, properties);
  }

  snapViewSnapResult(properties: SnapViewSnapResultProperties): void {
    this.trackEvent(AnalyticsEventType.SNAP_WITH_RESULT, properties);
  }

  snapViewSnapWithoutResult(properties: SnapViewSnapWithoutResultProperties): void {
    this.trackEvent(AnalyticsEventType.SNAP_WITHOUT_RESULT, properties);
  }

  snapOddsOpen(analytics: SnapOddsOpenProperties): void {
    this.trackEvent(AnalyticsEventType.ODDS_OPEN, analytics);
  }
}
