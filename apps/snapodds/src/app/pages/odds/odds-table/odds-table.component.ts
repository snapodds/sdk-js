import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Competitor, OddsOfferType } from '@response/typings';
import { BestOfferLineViewModel } from '../../../../models/best-offer-line-view-model';
import { SportsBookLineViewModel } from '../../../../models/sports-book-line-view-model';

@Component({
  selector: 'snapodds-odds-table',
  templateUrl: './odds-table.component.html',
  styleUrls: ['./odds-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OddsTableComponent {
  @Input() best = false;
  @Input() oddsOfferOrder!: OddsOfferType[];
  @Input() lines!: SportsBookLineViewModel[] | BestOfferLineViewModel[];
  @Input() competitors!: Competitor[];
}
