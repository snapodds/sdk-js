import { OddsOffer } from './odds-offer';
import { Link } from '../link';

/**
 * Represents an odds for the specific game in the given sports book.
 */
export interface SportsBook {
  /**
   * The name of the sports book.
   */
  name: string;

  /**
   * The odds offers available in the given sports book.
   */
  offers: OddsOffer[];

  _links?: {
    redirect?: Link;
  };
}
