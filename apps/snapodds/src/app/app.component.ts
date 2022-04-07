import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AccessToken, TvSearchResultEntry } from '@response/typings';
import { ApplicationConfigService } from '../services/config/application-config.service';
import { toLogLevel } from '../services/logger/log-level';
import { GoogleAnalyticsService } from '../services/tracking/google-analytics.service';
import { AppState, AppStateStore } from '../states/app-state.store';

@Component({
  selector: 'snapodds-sdk',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  /**
   * Holds the value of the TvSearchResultEntry for loading and rendering the lineOdds
   * Only to be accessed by property accessors.
   *
   * @private
   */
  #tvSearchResult: TvSearchResultEntry | null = null;

  @Input() apiUrl?: string;
  @Input() autoSnap?: boolean;
  @Input() autoSnapInitialDelay?: number;
  @Input() autoSnapInterval?: number;
  @Input() autoSnapMaxInterval?: number;
  @Input() language?: string;
  @Input() logLevel?: string;
  @Input() vibrate?: boolean;
  @Input() accessTokenProvider?: () => Promise<AccessToken>;
  @Input() logCallback?: (logLevel: string, data: unknown[]) => void;
  @Input() resultsCallback?: (tvSearchResult: TvSearchResultEntry) => void;
  @Input() closeCallback?: () => void;

  @Input()
  set tvSearchResult(tvSearchResultEntry: TvSearchResultEntry | null) {
    this.#tvSearchResult = tvSearchResultEntry;

    if (tvSearchResultEntry) {
      this.appStateStore.dispatch(AppState.SHOW_ODDS);
    }
  }

  /**
   * Returns the TvSearchResult, so that it can be used inside the template
   */
  get tvSearchResult() {
    return this.#tvSearchResult;
  }

  constructor(
    private readonly applicationConfigService: ApplicationConfigService,
    private readonly translateService: TranslateService,
    private readonly analyticsService: GoogleAnalyticsService,
    readonly appStateStore: AppStateStore
  ) {}

  /**
   * Sets up the applicationConfig, translations and analytics.
   * Called when the SDK is added to the DOM
   */
  ngOnInit(): void {
    this.setupApplicationConfig();
    this.setupTranslations();
    this.setupAnalytics();
  }

  /**
   * Trigger analytics method that SDK has been initialized
   * @private
   */
  private setupAnalytics(): void {
    this.analyticsService.sdkInitialized();
  }

  /**
   * Register the translation service for the configured language
   * @private
   */
  private setupTranslations(): void {
    this.translateService.use(this.applicationConfigService.getLanguage());
  }

  /**
   * Configure the application based on the component inputs and assigns the callbacks.
   *
   * @private
   */
  private setupApplicationConfig(): void {
    this.applicationConfigService.setConfig({
      apiUrl: this.apiUrl,
      autoSnap: this.autoSnap,
      autoSnapInitialDelay: this.autoSnapInitialDelay,
      autoSnapInterval: this.autoSnapInterval,
      autoSnapMaxInterval: this.autoSnapMaxInterval,
      language: this.language,
      logLevel: toLogLevel(this.logLevel),
      vibrate: this.vibrate,
      accessTokenProvider: this.accessTokenProvider,
      closeCallback: this.closeCallback,
      logCallback: this.logCallback,
      resultsCallback: this.resultsCallback,
    });
  }

  /**
   * Clears the stored tvSearchResults and renders the view to snap an image.
   */
  closeOddsView(): void {
    this.tvSearchResult = null;
    this.appStateStore.dispatch(AppState.SNAP_READY);
  }
}
