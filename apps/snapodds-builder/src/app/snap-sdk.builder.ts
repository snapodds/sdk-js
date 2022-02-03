import { TvSearchResultEntry } from '@response/typings';
import { SdkBuilder } from './sdk-builder';

/**
 * Closes the SDK after a successful Snap without rendering the OddsPage.
 */
export class SnapSdkBuilder extends SdkBuilder {
  assignProperties() {
    this.sdk.resultsCallback = (tvSearchResult: TvSearchResultEntry) => {
      this.resultsCallback?.(tvSearchResult);
      this.sdk.closeCallback?.();
    };
  }
}
