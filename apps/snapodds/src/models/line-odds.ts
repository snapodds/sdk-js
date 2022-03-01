import { Competitor, Player } from '@response/typings';
import { BestOfferViewModel } from './best-offer-view-model';
import { SportsBookViewModel } from './sports-book-view-model';

/**
 * Data structure used for rendering the lineOdds
 */
export interface LineOdds {
  /**
   * List of competitors
   */
  competitors: Competitor[];
  /**
   * List of players
   */
  players?: Player[];

  /**
   * List of sportBooks
   */
  sportsBooks?: SportsBookViewModel[];

  /**
   * Best available odds for either side of the live spread
   */
  bestOffer?: BestOfferViewModel;
}
