import { AccessToken, TvSearchResultEntry } from '@response/typings';
import { LogLevel } from '../services/logger/log-level';

export interface ApplicationConfig {
  /**
   * The apiUrl to be used for snapping
   */
  apiUrl: string;
  /**
   * Enable or disable autoSnapping
   */
  autoSnap: boolean;
  /**
   * The view language used for i18n
   */
  language: string;
  /**
   * The logLevel to be reported by the SDK
   */
  vibrate: boolean;
  /**
   * Enable if the device should vibrate if a snap has been successful
   */
  logLevel: LogLevel;
  /**
   * Provider used to retrieve an AccessToken from outside the SDK
   */
  logCallback: (logLevel: string, data: unknown[]) => void;
  /**
   * Callback executed whenever a log event inside the SDK has been written.
   */
  closeCallback: () => void;
  /**
   * Callback executed when snapping has returned a TvSearchResultEntry.
   */
  resultsCallback: (tvSearchResult: TvSearchResultEntry) => void;
  /**
   * Callback executed when the view is closed
   */
  accessTokenProvider: () => Promise<AccessToken>;
}