import { Competitor, Player } from '@response/typings';
import { SportsBook } from './sports-book';

export interface LineOdds {
  competitors: Competitor[];
  players?: Player[];
  sportsBooks?: SportsBook[];
}
