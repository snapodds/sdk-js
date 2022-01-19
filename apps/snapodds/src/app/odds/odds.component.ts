import { Component, EventEmitter, Inject, Input, OnChanges, Output, SimpleChange } from '@angular/core';
import { TvSearchResultEntry } from '@response/typings';
import { tap } from 'rxjs';
import { LineOdds } from '../../models/line-odds';
import { SnapOddsFacade } from '../../services/snap-odds/snap-odds-facade.service';
import { WINDOW } from '../../services/tokens/window-token';

@Component({
  selector: 'snapodds-odds',
  templateUrl: './odds.component.html',
  styleUrls: ['./odds.component.scss'],
})
export class OddsComponent implements OnChanges {
  lineOdds: LineOdds | null = null;
  loading = false;
  noResults = false;

  @Input() tvSearchResultEntry?: TvSearchResultEntry | null;
  @Output() closeOddsView: EventEmitter<void> = new EventEmitter();

  constructor(@Inject(WINDOW) private readonly window: Window, private readonly snapOddsFacade: SnapOddsFacade) {}

  openOutcomeRedirectUrl($event: MouseEvent, redirectUrl?: string | null) {
    if (redirectUrl) {
      $event.preventDefault();
      this.window.open(redirectUrl, '_blank');
    }
  }

  ngOnChanges(changes: { tvSearchResultEntry: SimpleChange }): void {
    if (changes.tvSearchResultEntry.currentValue) {
      this.loadLineOdds(changes.tvSearchResultEntry.currentValue.sportEvent.id);
    }
  }

  private loadLineOdds(sportEventId: number) {
    this.loading = true;
    this.noResults = false;

    this.snapOddsFacade
      .getLineOdds(sportEventId)
      .pipe(
        tap((lineOdds) => {
          if (lineOdds.sportsBooks?.length === 0) throw new Error('No SportsBooks found');
        })
      )
      .subscribe({
        next: (lineOdds) => {
          this.lineOdds = lineOdds;
          this.loading = false;
        },
        error: () => {
          this.lineOdds = null;
          this.noResults = true;
          this.loading = false;
        },
      });
  }
}
