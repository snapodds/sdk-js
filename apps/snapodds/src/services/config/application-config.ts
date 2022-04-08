import { AccessToken, TvSearchResultEntry } from '@response/typings';
import { LogLevel } from '../logger/log-level';
import { SdkMode } from './sdk-mode';

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
   * The delay before first AutoSnap attempts (in milliseconds)
   */
  autoSnapInitialDelay: number;
  /**
   * The interval between two AutoSnap attempts (in milliseconds)
   */
  autoSnapInterval: number;
  /**
   * The maximum time interval until we stop AutoSnapping after no results were found and the user has to perform a manual snap instead (in milliseconds)
   */
  autoSnapMaxInterval: number;
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
  /**
   * Either operator or sportmedia depending on how the Snap View was initialized.
   * If the Odds View is opened directly (without snapping) the mode is always “operator”
   */
  sdkMode: SdkMode.SPORTMEDIA;
}
