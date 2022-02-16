import { AccessToken, TvSearchResultEntry } from '@response/typings';
import { SnapOddsSdkElement } from './snap-odds-sdk-element.type';

/**
 * SdkBuilder which contains the shared functionality of the odds, operators or sports media workflow.
 */
export abstract class SdkBuilder {
  protected apiUrl?: string;
  protected autoSnap?: boolean;
  protected language?: string;
  protected logLevel?: string;
  protected vibrate?: boolean;
  protected tvSearchResult?: TvSearchResultEntry;

  protected accessTokenProvider?: () => Promise<AccessToken>;
  protected logCallback?: (logLevel: string, data: unknown[]) => void;
  protected resultsCallback?: (tvSearchResult: TvSearchResultEntry) => void;
  protected closeCallback?: () => void;

  protected readonly sdk: SnapOddsSdkElement;

  constructor() {
    this.sdk = document.createElement('snapodds-sdk') as SnapOddsSdkElement;
  }

  setApiUrl(apiUrl: string): this {
    this.apiUrl = apiUrl;
    return this;
  }

  setAutoSnap(autoSnap: boolean): this {
    this.autoSnap = autoSnap;
    return this;
  }

  setLanguage(language: string): this {
    this.language = language;
    return this;
  }

  setLogLevel(logLevel: string): this {
    this.logLevel = logLevel;
    return this;
  }

  setVibrate(vibrate: boolean): this {
    this.vibrate = vibrate;
    return this;
  }

  setAccessTokenProvider(accessTokenProvider: () => Promise<AccessToken>): this {
    this.accessTokenProvider = accessTokenProvider;
    return this;
  }

  onLog(logCallback: (logLevel: string, data: unknown[]) => void): this {
    this.logCallback = logCallback;
    return this;
  }

  onResults(resultsCallback: (tvSearchResult: TvSearchResultEntry) => void): this {
    this.resultsCallback = resultsCallback;
    return this;
  }

  onClose(closeCallback: () => void): this {
    this.closeCallback = closeCallback;
    return this;
  }

  /**
   * Assign all properties and callbacks to the SDK and appends the SDK to the given element.
   * @param element: dom element where the sdk will be appened to
   */
  appendTo(element: HTMLElement): void {
    this.sdk.language = this.language;
    this.sdk.apiUrl = this.apiUrl;
    this.sdk.autoSnap = this.autoSnap;
    this.sdk.logLevel = this.logLevel;
    this.sdk.vibrate = this.vibrate;
    this.sdk.accessTokenProvider = this.accessTokenProvider;
    this.sdk.logCallback = this.logCallback;
    this.sdk.resultsCallback = this.resultsCallback;

    this.sdk.closeCallback = () => {
      this.closeCallback?.();
      element.removeChild(this.sdk);
    };

    this.assignProperties();

    element.appendChild(this.sdk);
  }

  /**
   * Used to implement custom workflows
   */
  abstract assignProperties(): void;
}
