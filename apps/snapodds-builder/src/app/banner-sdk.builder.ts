import { TvSearchResultEntry } from '@response/typings';
import { SdkBuilder } from './sdk-builder';

export class BannerSdkBuilder extends SdkBuilder {
  assignProperties() {
    this.sdk.resultsCallback = (tvSearchResult: TvSearchResultEntry) => {
      this.sdk.tvSearchResult = tvSearchResult;
      this.resultsCallback?.(tvSearchResult);
    };
  }
}
