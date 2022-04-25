import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';
import { TvSearchResultEntry } from '@response/typings';
import { first } from 'rxjs';
import { LineOdds } from '../../../../models/line-odds';
import { OddsService } from '../../../../services/api/odds.service';
import { CustomerApplicationConfigService } from '../../../../services/config/customer-application-config.service';
import { WINDOW } from '../../../../services/tokens/window-token';
import { AnalyticsService } from '../../../../services/tracking/analytics.service';

@Component({
  selector: 'snapodds-odds',
  templateUrl: './odds.component.html',
  styleUrls: ['./odds.component.scss'],
})
export class OddsComponent implements OnInit, OnChanges {
  lineOdds: LineOdds | null = null;
  loading = false;
  noResults = false;

  @Input() tvSearchResultEntry?: TvSearchResultEntry | null;
  @Output() closeOddsView: EventEmitter<void> = new EventEmitter();

  constructor(
    private readonly oddsService: OddsService,
    private readonly analyticsService: AnalyticsService,
    private readonly customerApplicationConfigService: CustomerApplicationConfigService,
    @Inject(WINDOW) private readonly window: Window
  ) {}

  /**
   * Triggers the loading of the customerConfig
   */
  ngOnInit(): void {
    this.customerApplicationConfigService.load();
  }

  /**
   * Loads the lineOdds when the tvSearchResultEntry has been changed.
   *
   * @param changes: SimpleChanges
   */
  ngOnChanges(changes: { tvSearchResultEntry: SimpleChange }): void {
    const tvSearchResultEntry = changes.tvSearchResultEntry.currentValue;

    if (tvSearchResultEntry) {
      this.loadLineOdds(tvSearchResultEntry.sportEvent.id);
      this.trackOddsOpenEvent(tvSearchResultEntry.sportEvent.id);
    }
  }

  /**
   * After the customerApplicationConfig has been loaded, perform tracking of the oddsOpen Event
   * @param sportEventId
   * @private
   */
  private trackOddsOpenEvent(sportEventId: number) {
    this.customerApplicationConfigService.loaded$
      .pipe(first())
      .subscribe(() => this.analyticsService.snapOddsOpen({ sportevent_id: sportEventId }));
  }

  /**
   * Loads the lineOdds for a given sportEvent.
   * If sportsBooks are found, then lineOdds will be assigned.
   * if no sportsBooks are found or if the call fails, an error message will be shown.
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
   * Opens the given URL in a new browser tab.
   *
   * @param $event: MouseEvent
   * @param redirectUrl: The url that should be opened in a new tab
   */
  openSportsBookRedirectUrl($event: MouseEvent, redirectUrl?: string | null): void {
    if (redirectUrl) {
      $event.preventDefault();
      this.window.open(redirectUrl, '_blank');
    }
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
