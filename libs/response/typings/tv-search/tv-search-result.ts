import { Quadrangle2d } from './quadrangle2d';
import { TvSearchResultEntry } from './tv-search-result-entry';

export interface TvSearchResult {
  requestUuid: string;
  resultEntries: TvSearchResultEntry[];
  screenQuadrangles: Quadrangle2d[];
}
