import { OddsOffer } from './odds-offer';
import { OddsBestOfferOutcome } from './outcome';

export interface OddsBestOffer extends OddsOffer {
  /**
   * The possible outcomes of the offer to bet on.
   */
  outcomes: OddsBestOfferOutcome[];
}
