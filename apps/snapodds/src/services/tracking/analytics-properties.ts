import { SdkMode } from '../config/sdk-mode';

/**
 * Allowed properties that are sent along with each analytic event
 */
export interface AnalyticsProperties {
  mode?: SdkMode;
}
