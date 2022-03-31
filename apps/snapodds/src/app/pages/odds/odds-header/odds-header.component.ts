import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OddsOfferType } from '@response/typings';

@Component({
  selector: 'snapodds-odds-header',
  templateUrl: './odds-header.component.html',
  styleUrls: ['./odds-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OddsHeaderComponent {
  @Input() name?: string;
  @Input() best = false;
  @Input() oddsOfferOrder!: OddsOfferType[];
}
