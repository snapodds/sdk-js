import { AnalyticsProperties } from './analytics-properties';

export interface SnapViewSnapWithoutResultProperties extends AnalyticsProperties {
  /* Whether the result was from an autosnap or manual snap */
  autosnap: boolean;

  /* The request UUID returned from the backend */
  request: string;

  /* In milliseconds, from snap start (before the fingerprint is calculated) to getting the server response */
  duration: number;
}
