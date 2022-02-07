import { TvSearchResultEntry } from '@response/typings';
import { SdkBuilder } from './sdk-builder';

/**
 * Render the OddsPage for the given TvSearchResultEntry.
 */
export class OddsSdkBuilder extends SdkBuilder {
  setTvSearchResult(tvSearchResult: TvSearchResultEntry) {
    this.tvSearchResult = tvSearchResult;
    return this;
  }

  assignProperties() {
    this.sdk.tvSearchResult = this.tvSearchResult;
  }
}
