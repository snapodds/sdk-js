import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OddsOfferType } from '@response/typings';
import { BestOfferLineViewModel } from '../../../../models/best-offer-line-view-model';
import { SportsBookLineViewModel } from '../../../../models/sports-book-line-view-model';

@Component({
  selector: 'snapodds-odds-line',
  templateUrl: './odds-line.component.html',
  styleUrls: ['./odds-line.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OddsLineComponent {
  @Input() line!: SportsBookLineViewModel | BestOfferLineViewModel;
  @Input() lineIndex!: number;
  @Input() competitorName!: string;
  @Input() oddsOfferOrder!: OddsOfferType[];
}
