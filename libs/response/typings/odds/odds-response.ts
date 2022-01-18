import { Competitor } from './competitor';
import { Player } from './player';
import { SportsBook } from './sports-book';
import { Link } from '../link';

export interface OddsResponse {
  startTime: string;
  competitors: Competitor[];
  players?: Player[];
  sportsBooks: SportsBook[];
  _links?: {
    self?: Link;
  };
}
