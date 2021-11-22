export interface SportsBook {
  name: string;
  lines: {
    spread: number | null;
    spreadUrl?: string | null;
    spreadOdds: number | null;
    moneyline: number | null;
    moneylineUrl?: string | null;
    overUnder: number | null;
    overUnderUrl?: string | null;
    overUnderOdds: number | null;
  }[];
  redirectUrl: string;
}
