import { TvSearchResultEntry } from '@response/typings';
import { SdkBuilder } from './sdk-builder';

/**
 * Closes the SDK after a successful Snap without rendering the OddsPage
 */
export class OperatorsSdkBuilder extends SdkBuilder {
  override readonly sdkMode = 'operator';

  assignProperties() {
    this.sdk.resultsCallback = (tvSearchResult: TvSearchResultEntry) => {
      this.resultsCallback?.(tvSearchResult);
      this.sdk.closeCallback?.();
    };
  }
}
