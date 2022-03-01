import { BestOfferLineViewModel } from './best-offer-line-view-model';

export interface BestOfferViewModel {
  /**
   * The name of the sports book.
   */
  name: string;
  /**
   * One line contains the various OddsBestOffers combined.
   */
  lines: BestOfferLineViewModel[];
}
