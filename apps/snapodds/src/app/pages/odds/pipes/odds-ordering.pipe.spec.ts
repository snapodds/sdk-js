import { OddsOfferType } from '@response/typings';
import { OddsOrderingPipe } from './odds-ordering.pipe';

describe('OddsOrderingPipe', () => {
  const pipe = new OddsOrderingPipe();

  it.each`
    oddsOfferTypes                           | oddsOfferType   | orderNumber
    ${['MONEYLINE', 'SPREAD', 'OVER_UNDER']} | ${'MONEYLINE'}  | ${1}
    ${['MONEYLINE', 'SPREAD', 'OVER_UNDER']} | ${'SPREAD'}     | ${2}
    ${['MONEYLINE', 'SPREAD', 'OVER_UNDER']} | ${'OVER_UNDER'} | ${3}
  `(
    `should map '$oddType' for $oddsOfferType to order number '$orderNumber'`,
    ({
      oddsOfferTypes,
      oddsOfferType,
      orderNumber,
    }: {
      oddsOfferTypes: OddsOfferType[];
      oddsOfferType: OddsOfferType;
      orderNumber: number;
    }) => {
      expect(pipe.transform(oddsOfferTypes, oddsOfferType)).toBe(orderNumber);
    }
  );
});
