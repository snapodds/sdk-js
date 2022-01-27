import { Competitor } from './competitor';
import { Player } from './player';
import { SportsBook } from './sports-book';
import { Link } from '../link';

/**
 * Represents an odds available for the corresponding sport event.
 */
export interface OddsResponse {
  /**
   * The start time of the sport event.
   */
  startTime: string;

  /**
   * The competitors of the sport event.
   */
  competitors: Competitor[];

  /**
   * The players of the sport event.
   */
  players?: Player[];

  /**
   * The odds available for the sport event.
   */
  sportsBooks: SportsBook[];

  _links?: {
    self?: Link;
  };
}
