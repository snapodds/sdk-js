import { OddsOffer } from './odds-offer';
import { Link } from '../link';

export interface SportsBook {
  name: string;
  offers: OddsOffer[];
  _links?: {
    redirect?: Link;
  };
}
