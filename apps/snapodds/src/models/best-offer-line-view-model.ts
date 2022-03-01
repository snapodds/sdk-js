/**
 * Data structure used to render the combined info of best offers.
 */
import { SportsBookLineViewModel } from './sports-book-line-view-model';

export interface BestOfferLineViewModel extends SportsBookLineViewModel {
  /**
   * The name of the sportsBook for the best spread offer
   */
  spreadSportsBookName?: string;

  /**
   * The name of the sportsBook for the best money offer
   */
  moneySportsBookName?: string;

  /**
   * The name of the sportsBook for the best overUnder offer
   */
  overUnderSportsBookName?: string;
}
