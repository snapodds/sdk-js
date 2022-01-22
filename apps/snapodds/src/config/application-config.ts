import { AccessToken, TvSearchResultEntry } from '@response/typings';
import { LogLevel } from '../services/logger/log-level';

export interface ApplicationConfig {
  apiUrl: string;
  autoSnap: boolean;
  language: string;
  vibrate: boolean;
  logLevel: LogLevel;
  logCallback: (logLevel: string, data: unknown[]) => void;
  closeCallback: () => void;
  resultsCallback: (tvSearchResult: TvSearchResultEntry) => void;
  accessTokenProvider: () => Promise<AccessToken>;
}
