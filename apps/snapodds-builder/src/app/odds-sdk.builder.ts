import { TvSearchResultEntry } from '@response/typings';
import { SdkBuilder } from './sdk-builder';

export class OddsSdkBuilder extends SdkBuilder {
  setTvSearchResult(tvSearchResult: TvSearchResultEntry) {
    this.tvSearchResult = tvSearchResult;
    return this;
  }

  assignProperties() {
    this.sdk.tvSearchResult = this.tvSearchResult;
  }
}
