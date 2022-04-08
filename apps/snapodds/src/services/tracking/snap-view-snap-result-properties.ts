import { AnalyticsProperties } from './analytics-properties';

export interface SnapViewSnapResultProperties extends AnalyticsProperties {
  /* Whether the result was from an autosnap or manual snap */
  autosnap: boolean;

  /* The request UUID returned from the backend */
  request: string;

  /* In milliseconds, from snap start (before the fingerprint is calculated) to getting the server response */
  duration: number;

  /* List of the scores of the results */
  scores: number[];

  /* List of the IDs of the sport event results */
  results: number[];
}
