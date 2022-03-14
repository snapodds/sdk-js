import { Link } from '../link';

/**
 * Represents an odds for the outcome of the bet.
 */
export interface OddsOfferOutcome {
  /**
   * The type of the outcome.
   */
  type: 'WIN' | 'OVER' | 'UNDER';

  /**
   * The target value for spread or over/under bets.
   */
  target?: number | null;

  /**
   * The odds for the given type of the outcome.
   */
  odds: number;

  /**
   * The id of the competitor to bet on.
   */
  competitorId?: number;

  /**
   * The id of the player to bet on.
   */
  playerId?: number;

  /**
   * Flag to indicate if it is the best offer in the outcomes
   */
  best?: boolean;

  _links?: {
    redirect?: Link;
  };
}
