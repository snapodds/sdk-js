import { OddsOfferOutcome } from './odds-offer-outcome';
import { Link } from '../link';

export interface OddsOffer {
  type: 'SPREAD' | 'MONEYLINE' | 'OVER_UNDER';
  label?: string;
  outcomes: OddsOfferOutcome[];
  _links?: {
    redirect?: Link;
  };
}
