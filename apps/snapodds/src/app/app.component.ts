import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AccessToken, TvSearchResultEntry } from '@response/typings';
import { AuthService } from '../services/auth/auth.service';
import { ApplicationConfigService } from '../services/config/application-config.service';
import { toLogLevel } from '../services/logger/log-level';
import { LoggerEvent } from '../services/logger/logger-event';
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

  @Input()
  set tokenResponse(authResponse: AccessToken) {
    this.authService.updateToken(authResponse);
  }

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

  @Output() closed: EventEmitter<void> = new EventEmitter();
  @Output() log: EventEmitter<LoggerEvent> = new EventEmitter();
  @Output() results: EventEmitter<TvSearchResultEntry> = new EventEmitter();
  @Output() tokenRefresh: EventEmitter<void> = new EventEmitter();

  constructor(
    private readonly applicationConfigService: ApplicationConfigService,
    private readonly translateService: TranslateService,
    private readonly analyticsService: GoogleAnalyticsService,
    private readonly authService: AuthService,
    readonly appStateStore: AppStateStore
  ) {}

  ngOnInit(): void {
    this.setupApplicationConfig();
    this.setupTranslations();
    this.setupAnalytics();

    this.tokenRefresh.emit();
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
      closeEvent: this.closed,
      language: this.language,
      logLevel: toLogLevel(this.logLevel),
      loggerEvent: this.log,
      resultsEvent: this.results,
      tokenRefreshEvent: this.tokenRefresh,
      vibrate: this.vibrate,
    });
  }

  closeOddsView(): void {
    this.tvSearchResult = null;
    this.appStateStore.dispatch(AppState.SNAP_READY);
  }
}
