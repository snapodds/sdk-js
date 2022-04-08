import { AnalyticsProperties } from './analytics-properties';

export interface SnapViewSnapFailedProperties extends AnalyticsProperties {
  /* Whether the result was from an autosnap or manual snap */
  autosnap: boolean;

  /* The request UUID returned from the backend */
  request: string;

  /* In milliseconds, from snap start (before the fingerprint is calculated) to getting the server response */
  duration: number;

  /* if available the http status code */
  http_status_code: number;

  /* if available and an JSON error payload with a field status_code was returned */
  status_code: number;

  /* if available and an JSON error payload with a field status_message was returned */
  status_message: string;
}
