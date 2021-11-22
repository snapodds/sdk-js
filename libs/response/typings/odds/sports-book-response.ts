import { OfferResponse } from './offer-response';

export interface SportsBookResponse {
  name: string;
  offers: OfferResponse[];
  _links: {
    redirect: {
      href: string;
    };
  };
}
