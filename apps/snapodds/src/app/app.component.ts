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
  private tvSearchResultEntry: TvSearchResultEntry | null = null;

  @Input() apiUrl?: string;
  @Input() autoSnap?: boolean;
  @Input() language?: string;
  @Input() logLevel?: string;
  @Input() vibrate?: boolean;

  @Input() accessTokenProvider?: () => Promise<AccessToken>;
  @Input() logCallback?: (logLevel: string, data: unknown[]) => void;
  @Input() resultsCallback?: (tvSearchResult: TvSearchResultEntry) => void;
  @Input() closeCallback?: () => void;

  @Input()
  set tvSearchResult(tvSearchResultEntry: TvSearchResultEntry | null) {
    this.tvSearchResultEntry = tvSearchResultEntry;

    if (tvSearchResultEntry) {
      this.appStateStore.dispatch(AppState.SHOW_ODDS);
    }
  }

  get tvSearchResult() {
    return this.tvSearchResultEntry;
  }

  constructor(
    private readonly applicationConfigService: ApplicationConfigService,
    private readonly translateService: TranslateService,
    private readonly analyticsService: GoogleAnalyticsService,
    readonly appStateStore: AppStateStore
  ) {}

  ngOnInit(): void {
    this.setupApplicationConfig();
    this.setupTranslations();
    this.setupAnalytics();
  }

  private setupAnalytics(): void {
    this.analyticsService.sdkInitialized();
  }

  private setupTranslations(): void {
    this.translateService.use(this.applicationConfigService.getLanguage());
  }

  private setupApplicationConfig(): void {
    this.applicationConfigService.setConfig({
      apiUrl: this.apiUrl,
      autoSnap: this.autoSnap,
      language: this.language,
      logLevel: toLogLevel(this.logLevel),
      vibrate: this.vibrate,
      accessTokenProvider: this.accessTokenProvider,
      closeCallback: this.closeCallback,
      logCallback: this.logCallback,
      resultsCallback: this.resultsCallback,
    });
  }

  closeOddsView(): void {
    this.tvSearchResult = null;
    this.appStateStore.dispatch(AppState.SNAP_READY);
  }
}
