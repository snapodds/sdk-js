/**
 * Data structure used to render the combined info of offers.
 */
export interface SportsBookLineViewModel {
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
   * Flag indicating if spread is the best offer in the outcomes
   */
  spreadBest?: boolean;

  /**
   * The target value for the money line.
   */
  moneyline: number | null;

  /**
   * The url pointing to the money line.
   */
  moneylineUrl?: string | null;

  /**
   * Flag indicating if overUnder is the best offer in the outcomes
   */
  moneylineBest?: boolean;

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

  /**
   * Flag indicating if overUnder is the best offer in the outcomes
   */
  overUnderBest?: boolean;
}
