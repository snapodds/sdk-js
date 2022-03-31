import { Pipe, PipeTransform } from '@angular/core';
import { BestOfferLineViewModel } from '../../../../models/best-offer-line-view-model';
import { SportsBookLineViewModel } from '../../../../models/sports-book-line-view-model';

@Pipe({
  name: 'bestOfferLine',
})
export class BestOfferLinePipe implements PipeTransform {
  /**
   * Pipe used to avoid typecasting to $any as interfaces can't be distinguished in templates.
   * @param line
   */
  transform(line: SportsBookLineViewModel | BestOfferLineViewModel): BestOfferLineViewModel {
    return line as BestOfferLineViewModel;
  }
}
