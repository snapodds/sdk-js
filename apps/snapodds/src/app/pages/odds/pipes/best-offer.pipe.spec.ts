import { BestOfferLineViewModel } from '../../../../models/best-offer-line-view-model';
import { BestOfferLinePipe } from './best-offer.pipe';

describe('BestOfferPipe', () => {
  it('should return the passed in offer line', () => {
    const pipe = new BestOfferLinePipe();
    const bestOfferLine: BestOfferLineViewModel = {
      spread: -6.5,
      spreadOdds: -110,
      moneyline: -275,
      overUnder: 43,
      overUnderOdds: -110,
      spreadSportsBookName: 'SI Sportsbook',
      moneySportsBookName: 'BetMGM',
      overUnderSportsBookName: 'William Hill',
    };
    expect(pipe.transform(bestOfferLine)).toBe(bestOfferLine);
  });
});
