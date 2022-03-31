import { Link } from '../link';
import { OddsOfferOutcome } from './odds-offer-outcome';
import { OddsOfferType } from './odds-offer-type';

/**
 * Represents a single odds offer.
 */
export interface OddsOffer {
  /**
   * The type of the offer.
   */
  type: OddsOfferType;

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
