import { CompetitorResponse } from './competitor-response';
import { PlayerResponse } from './player-response';
import { SportsBookResponse } from './sports-book-response';

export interface LineOddsResponse {
  startTime: string;
  competitors: CompetitorResponse[];
  players?: PlayerResponse[];
  sportsBooks: SportsBookResponse[];
  _links: {
    self: {
      href: string;
      templated: boolean;
    };
  };
}
