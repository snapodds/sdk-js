import { NgElement, WithProperties } from '@angular/elements';
import { AccessToken, TvSearchResultEntry } from '@response/typings';

export type SnapOddsSdkElement = NgElement &
  WithProperties<{
    apiUrl?: string;
    autoSnap?: boolean;
    autoSnapInitialDelay?: number;
    autoSnapInterval?: number;
    autoSnapMaxInterval?: number;
    language?: string;
    logLevel?: string;
    vibrate?: boolean;
    tvSearchResult?: TvSearchResultEntry;
    accessTokenProvider?: () => Promise<AccessToken>;
    logCallback?: (logLevel: string, data: unknown[]) => void;
    resultsCallback?: (tvSearchResult: TvSearchResultEntry) => void;
    closeCallback?: () => void;
    sdkMode?: 'sportmedia' | 'operator';
  }>;
