import { CompetitorResponse, PlayerResponse } from '@response/typings';
import { SportsBook } from './sports-book';

export interface LineOdds {
  competitors: CompetitorResponse[];
  players?: PlayerResponse[];
  sportsBooks?: SportsBook[];
}
