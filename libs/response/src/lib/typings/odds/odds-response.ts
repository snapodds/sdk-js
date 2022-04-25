import { Link } from '../link';
import { Competitor } from './competitor';
import { OddsBestOffer } from './odds-best-offer';
import { OddsOfferType } from './odds-offer-type';
import { Player } from './player';
import { Sports } from './sports';
import { SportsBook } from './sports-book';

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

  /**
   * The best offers for the sport event.
   */
  bestOffers?: OddsBestOffer[];

  /**
   *  Limited list of supported team sports
   */
  sport: Sports;

  /**
   * Ordering of odds in the odds list
   */
  oddsOfferOrder?: OddsOfferType[];

  _links?: {
    self?: Link;
  };
}
