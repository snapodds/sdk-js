import { Component, EventEmitter, Inject, Input, OnChanges, Output, SimpleChange } from '@angular/core';
import { TvSearchResultEntry, TvSearchResult } from '@response/typings';
import { LineOdds } from '../../models/line-odds';
import { SnapOddsFacade } from '../../services/snap-odds/snap-odds-facade.service';
import { WINDOW } from '../../services/tokens/window-token';

@Component({
  selector: 'snapodds-odds',
  templateUrl: './odds.component.html',
  styleUrls: ['./odds.component.scss'],
})
export class OddsComponent implements OnChanges {
  sportEventResult: TvSearchResultEntry | null = null;
  lineOdds: LineOdds | null = null;
  loading = false;
  error = false;

  @Input() sportEventsResponse?: TvSearchResult | null;
  @Output() closeOddsView: EventEmitter<void> = new EventEmitter();

  constructor(@Inject(WINDOW) private readonly window: Window, private readonly snapOddsFacade: SnapOddsFacade) {}

  openOutcomeRedirectUrl($event: MouseEvent, redirectUrl?: string | null) {
    if (redirectUrl) {
      $event.preventDefault();
      this.window.open(redirectUrl, '_blank');
    }
  }

  ngOnChanges(changes: { sportEventsResponse: SimpleChange }): void {
    this.sportEventResult = changes.sportEventsResponse.currentValue.resultEntries[0] ?? null;

    if (this.sportEventResult) {
      this.loadLineOdds(this.sportEventResult.sportEvent.id);
    }
  }

  private loadLineOdds(sportEventId: number) {
    this.loading = true;
    this.error = false;

    this.snapOddsFacade.getLineOdds(sportEventId).subscribe({
      next: (lineOdds) => {
        this.lineOdds = lineOdds;
        this.loading = false;
      },
      error: () => {
        this.lineOdds = null;
        this.error = true;
        this.loading = false;
      },
    });
  }
}
