import { OddsOfferOutcome } from './odds-offer-outcome';

/**
 * Represents an odds for the best outcome of the bet.
 */
export interface OddsBestOfferOutcome extends OddsOfferOutcome {
  /**
   * The name of the sports book.
   */
  sportsBook: string;
}
