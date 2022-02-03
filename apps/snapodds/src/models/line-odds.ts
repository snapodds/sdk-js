import { Competitor, Player } from '@response/typings';
import { SportsBook } from './sports-book';

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
  sportsBooks?: SportsBook[];
}
