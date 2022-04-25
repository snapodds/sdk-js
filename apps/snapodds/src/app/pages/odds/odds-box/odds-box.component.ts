import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { WINDOW } from '../../../../services/tokens/window-token';

@Component({
  selector: 'snapodds-odds-box',
  templateUrl: './odds-box.component.html',
  styleUrls: ['./odds-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OddsBoxComponent {
  @Input() best?: boolean;
  @Input() empty?: boolean;
  @Input() url?: string | null;
  @Input() label?: string;
  @Input() target?: string;
  @Input() odds?: string;

  constructor(@Inject(WINDOW) private readonly window: Window) {}

  /**
   * Opens the given URL in a new browser tab.
   *
   * @param $event: MouseEvent
   * @param redirectUrl: The url that should be opened in a new tab
   */
  openRedirectUrl($event: MouseEvent, redirectUrl?: string | null): void {
    if (redirectUrl) {
      $event.preventDefault();
      this.window.open(redirectUrl, '_blank');
    }
  }
}
