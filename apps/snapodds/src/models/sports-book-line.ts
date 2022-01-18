export interface SportsBookLine {
  spread: number | null;
  spreadOdds: number | null;
  spreadUrl?: string | null;
  moneyline: number | null;
  moneylineUrl?: string | null;
  overUnder: number | null;
  overUnderOdds: number | null;
  overUnderUrl?: string | null;
}
