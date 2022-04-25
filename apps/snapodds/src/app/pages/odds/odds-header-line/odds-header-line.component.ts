import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OddsOfferType } from '@response/typings';

@Component({
  selector: 'snapodds-odds-header-line',
  templateUrl: './odds-header-line.component.html',
  styleUrls: ['./odds-header-line.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OddsHeaderLineComponent {
  @Input() name?: string;
  @Input() best = false;
  @Input() oddsOfferOrder!: OddsOfferType[];
}
