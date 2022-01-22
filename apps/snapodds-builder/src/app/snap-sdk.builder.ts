import { TvSearchResultEntry } from '@response/typings';
import { SdkBuilder } from './sdk-builder';

export class SnapSdkBuilder extends SdkBuilder {
  assignProperties() {
    this.sdk.resultsCallback = (tvSearchResult: TvSearchResultEntry) => {
      this.resultsCallback?.(tvSearchResult);
      this.sdk.closeCallback?.();
    };
  }
}
