/**
 * Data structure used to render the combined info of offers.
 */
export interface SportsBookLine {
  /**
   * The target value for spread.
   */
  spread: number | null;

  /**
   * The odds for the spread outcome.
   */
  spreadOdds: number | null;

  /**
   * The url pointing to the spread.
   */
  spreadUrl?: string | null;

  /**
   * The target value for the money line.
   */
  moneyline: number | null;

  /**
   * The url pointing to the money line.
   */
  moneylineUrl?: string | null;

  /**
   * The target value for over/under.
   */
  overUnder: number | null;

  /**
   * The odds for the over/under outcome.
   */
  overUnderOdds: number | null;

  /**
   * The url pointing to the over/under.
   */
  overUnderUrl?: string | null;
}
