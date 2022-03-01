import { Component, Inject, Input } from '@angular/core';
import { BestOfferLineViewModel } from '../../models/best-offer-line-view-model';
import { SportsBookLineViewModel } from '../../models/sports-book-line-view-model';
import { WINDOW } from '../../services/tokens/window-token';

@Component({
  selector: 'snapodds-odds-line',
  templateUrl: './odds-line.component.html',
  styleUrls: ['./odds-line.component.scss'],
})
export class OddsLineComponent {
  @Input() line!: SportsBookLineViewModel | BestOfferLineViewModel;
  @Input() lineIndex!: number;
  @Input() competitorName!: string;

  constructor(@Inject(WINDOW) private readonly window: Window) {}

  /**
   * Opens the given URL in a new browser tab.
   *
   * @param $event: MouseEvent
   * @param redirectUrl: The url that should be opened in a new tab
   */
  openOutcomeRedirectUrl($event: MouseEvent, redirectUrl?: string | null): void {
    if (redirectUrl) {
      $event.preventDefault();
      this.window.open(redirectUrl, '_blank');
    }
  }
}
