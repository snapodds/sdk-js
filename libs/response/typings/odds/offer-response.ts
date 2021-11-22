import { OutcomeResponse } from './outcome-response';

export interface OfferResponse {
  type: 'SPREAD' | 'MONEYLINE' | 'OVER_UNDER';
  outcomes: OutcomeResponse[];
}
