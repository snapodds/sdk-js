export interface OutcomeResponse {
  type: 'WIN' | 'OVER' | 'UNDER';
  target?: number | null;
  odds: number;
  competitorId?: number;
  _links?: {
    redirect?: {
      href: string;
    };
  };
}
