/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Pipe, PipeTransform } from '@angular/core';
import { OddsOfferType } from '@response/typings';

@Pipe({
  name: 'oddsOrdering',
})
export class OddsOrderingPipe implements PipeTransform {
  transform(oddsOfferOrder: OddsOfferType[] | undefined | null, oddsOfferType: OddsOfferType): unknown {
    if (!oddsOfferOrder) return 1;
    return oddsOfferOrder.indexOf(oddsOfferType) + 1;
  }
}
