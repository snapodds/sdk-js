import { OddsOfferOutcome } from './odds-offer-outcome';
import { Link } from '../link';

/**
 * Represents a single odds offer.
 */
export interface OddsOffer {
  /**
   * The type of the offer.
   */
  type: 'SPREAD' | 'MONEYLINE' | 'OVER_UNDER';

  /**
   * The label of the offer.
   */
  label?: string;

  /**
   * The possible outcomes of the offer to bet on.
   */
  outcomes: OddsOfferOutcome[];

  _links?: {
    redirect?: Link;
  };
}
