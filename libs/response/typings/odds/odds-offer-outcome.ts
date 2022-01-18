import { Link } from '../link';

export interface OddsOfferOutcome {
  type: 'WIN' | 'OVER' | 'UNDER';
  target?: number | null;
  odds: number;
  competitorId?: number;
  playerId?: number;
  _links?: {
    redirect?: Link;
  };
}
