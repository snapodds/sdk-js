import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SportEvent } from '@response/typings';

@Component({
  selector: 'snapodds-odds-game-info',
  templateUrl: './odds-game-info.component.html',
  styleUrls: ['./odds-game-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OddsGameInfoComponent {
  @Input() sportEvent!: SportEvent;
}
