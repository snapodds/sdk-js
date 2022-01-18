import { SportsBookLine } from './sports-book-line';

export interface SportsBook {
  name: string;
  lines: SportsBookLine[];
  redirectUrl?: string;
}
