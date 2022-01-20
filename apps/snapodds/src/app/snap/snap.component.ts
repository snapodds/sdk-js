import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TvSearchResult } from '@response/typings';
import { Observable, Subject, defer, delay, mergeMap, race, retryWhen, switchMap, take, takeUntil, timer } from 'rxjs';
import { ApplicationConfigService } from '../../services/config/application-config.service';
import { ManipulatedImage } from '../../services/image-manipulation/manipulated-image';
import { LoggerService } from '../../services/logger/logger.service';
import { NotificationService } from '../../services/notification/notification.service';
import { TvSearchNoResultError } from '../../services/api/api-errors';
import { SnapOddsFacade } from '../../services/snap-odds/snap-odds-facade.service';
import { LOCATION } from '../../services/tokens/location-token';
import { GoogleAnalyticsService } from '../../services/tracking/google-analytics.service';
import { AppState, AppStateStore } from '../../states/app-state.store';
import { MediaDeviceState, MediaDeviceStateStore } from '../../states/media-device-state.store';
import { WebcamComponent } from '../webcam/webcam.component';

@Component({
  selector: 'snapodds-snap',
  templateUrl: './snap.component.html',
  styleUrls: ['./snap.component.scss'],
})
export class SnapComponent implements OnInit, OnDestroy {
  @ViewChild(WebcamComponent) webcamComponent!: WebcamComponent;

  appState: AppState | undefined;
  mediaDeviceState: MediaDeviceState | undefined;

  private readonly destroyed$ = new Subject<void>();
  private readonly snapshot$ = new Subject<void>();

  constructor(
    private readonly logger: LoggerService,
    private readonly applicationConfigService: ApplicationConfigService,
    private readonly analyticsService: GoogleAnalyticsService,
    private readonly snapOddsFacade: SnapOddsFacade,
    private readonly appStateStore: AppStateStore,
    private readonly mediaDeviceStateStore: MediaDeviceStateStore,
    private readonly notificationService: NotificationService,
    @Inject(LOCATION) private readonly location: Location
  ) {}

  ngOnInit(): void {
    if (this.applicationConfigService.isAutoSnapEnabled()) {
      this.registerAutoSnap();
    }

    this.subscribeToStateStores();

    this.appStateStore.dispatch(AppState.SNAP_READY);
    this.analyticsService.snapViewOpened();
  }

  private subscribeToStateStores() {
    this.appStateStore
      .getState()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((appState) => (this.appState = appState));

    this.mediaDeviceStateStore
      .getState()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((mediaDeviceState) => (this.mediaDeviceState = mediaDeviceState));
  }

  ngOnDestroy(): void {
    this.analyticsService.snapViewClosed();
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  takeSnapshot(): void {
    this.snapshot$.next();

    this.loadSportEvents().subscribe({
      next: (response) => this.handleSuccess(response),
      error: (error) => this.handleError(error),
    });
  }

  private registerAutoSnap(): void {
    this.mediaDeviceStateStore.webcamIsReady$
      .pipe(
        take(1),
        takeUntil(this.destroyed$),
        switchMap(() => this.startAutoSnapWithDelay())
      )
      .subscribe((response) => this.handleSuccess(response));
  }

  private startAutoSnapWithDelay(): Observable<TvSearchResult> {
    return timer(this.applicationConfigService.getAutoSnapDelay(true)).pipe(
      mergeMap(() =>
        this.loadSportEvents(true).pipe(
          retryWhen((errors) => errors.pipe(delay(this.applicationConfigService.getAutoSnapDelay())))
        )
      ),
      takeUntil(race(this.destroyed$, this.snapshot$))
    );
  }

  private handleSuccess(sportEventsResponse: TvSearchResult) {
    this.notificationService.notify();
    this.applicationConfigService.emitResultsEvent(sportEventsResponse.resultEntries[0]);
  }

  private handleError(error: unknown): void {
    if (error instanceof TvSearchNoResultError) {
      this.appStateStore.dispatch(AppState.SNAP_NO_RESULTS);
    } else {
      this.appStateStore.dispatch(AppState.SNAP_FAILED);
    }
  }

  private loadSportEvents(autoSnap = false): Observable<TvSearchResult> {
    if (!autoSnap) {
      this.appStateStore.dispatch(AppState.SNAP_IN_PROGRESS);
    }
    return defer(() => this.webcamComponent.triggerSnapshot()).pipe(
      switchMap((webcamImage: ManipulatedImage) => {
        if (autoSnap) {
          return this.snapOddsFacade.autoSearchSport(webcamImage.blob);
        } else {
          return this.snapOddsFacade.searchSport(webcamImage.blob);
        }
      })
    );
  }

  showHelpPage(): void {
    this.appStateStore.dispatch(AppState.SHOW_HELP);
  }

  reloadPage(): void {
    this.location.reload();
  }
}
