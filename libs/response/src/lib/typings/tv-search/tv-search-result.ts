import { Quadrangle2d } from './quadrangle2d';
import { TvSearchResultEntry } from './tv-search-result-entry';

/**
 * A result of TV search.
 */
export interface TvSearchResult {
  /**
   * A result of TV search.
   */
  requestUuid: string;

  /**
   * The list of result entries.
   */
  resultEntries: TvSearchResultEntry[];

  /**
   * The quadrangles of TV screen found on the images used for the TV search.
   */
  screenQuadrangles: Quadrangle2d[];
}
