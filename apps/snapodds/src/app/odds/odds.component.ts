import { Component, EventEmitter, Inject, Input, OnChanges, Output, SimpleChange } from '@angular/core';
import { TvSearchResultEntry } from '@response/typings';
import { LineOdds } from '../../models/line-odds';
import { OddsService } from '../../services/api/odds.service';
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

  constructor(@Inject(WINDOW) private readonly window: Window, private readonly oddsService: OddsService) {}

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

  /**
   * Loads the lineOdds when the tvSearchResultEntry has been changed.
   *
   * @param changes: SimpleChanges
   */
  ngOnChanges(changes: { tvSearchResultEntry: SimpleChange }): void {
    if (changes.tvSearchResultEntry.currentValue) {
      this.loadLineOdds(changes.tvSearchResultEntry.currentValue.sportEvent.id);
    }
  }

  /**
   * Loads the lineOdds for a given sportEvent.
   * If sportBooks are found, then lineOdds will be assigned.
   * if no sportBooks are found or if the call fails, an error message will be shown.
   *
   * @param sportEventId: The identifier of the sportEvent
   * @private
   */
  private loadLineOdds(sportEventId: number): void {
    this.loading = true;
    this.noResults = false;

    this.oddsService.gameLineOddsBySportEventId(sportEventId).subscribe({
      next: (lineOdds) => {
        if (lineOdds.sportsBooks == undefined || lineOdds.sportsBooks.length === 0) {
          this.onLineOddsLoadFailed();
        } else {
          this.onLineOddsLoaded(lineOdds);
        }
      },
      error: () => this.onLineOddsLoadFailed(),
    });
  }

  /**
   * Callback when loading of lineOdds was successful
   *
   * @param lineOdds: The lineOdds to assign to the template
   * @private
   */
  private onLineOddsLoaded(lineOdds: LineOdds): void {
    this.lineOdds = lineOdds;
    this.loading = false;
  }

  /**
   * Callback when loading of lineOdds failed.
   *
   * @private
   */
  private onLineOddsLoadFailed(): void {
    this.lineOdds = null;
    this.noResults = true;
    this.loading = false;
  }
}
