import { SportsBookLine } from './sports-book-line';

/**
 * Data structure used to render the sportBooks for LineOdds
 */
export interface SportsBook {
  /**
   * The name of the sports book.
   */
  name: string;
  /**
   * One line contains the various OddsOffers combined.
   */
  lines: SportsBookLine[];

  /**
   * The link which will be used to redirect the user to.
   */
  redirectUrl?: string;
}
