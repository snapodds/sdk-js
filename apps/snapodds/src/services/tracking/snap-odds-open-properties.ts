import { AnalyticsProperties } from './analytics-properties';

export interface SnapOddsOpenProperties extends AnalyticsProperties {
  /* The id of the event for which the odds should be displayed */
  sportevent_id: number;
}
