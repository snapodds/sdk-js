import { SportsBookLineViewModel } from './sports-book-line-view-model';

/**
 * Data structure used to render the sportBooks for LineOdds
 */
export interface SportsBookViewModel {
  /**
   * The name of the sports book.
   */
  name: string;
  /**
   * One line contains the various OddsOffers combined.
   */
  lines: SportsBookLineViewModel[];

  /**
   * The link which will be used to redirect the user to.
   */
  redirectUrl?: string;
}
