import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { sportEventTvSearchMock } from '@response/mocks';
import { mock, MockProxy } from 'jest-mock-extended';
import { of, ReplaySubject, throwError } from 'rxjs';
import { TvSearchNoResultError } from '../../../../services/api/api-errors';
import { TvSearchService } from '../../../../services/api/tv-search.service';
import { ApplicationConfigService } from '../../../../services/config/application-config.service';
import { CustomerApplicationConfigService } from '../../../../services/config/customer-application-config.service';
import { ManipulatedImage } from '../../../../services/image-manipulation/manipulated-image';
import { LoggerService } from '../../../../services/logger/logger.service';
import { NotificationService } from '../../../../services/notification/notification.service';
import { LOCATION } from '../../../../services/tokens/location-token';
import { AnalyticsService } from '../../../../services/tracking/analytics.service';
import { AppState, AppStateStore } from '../../../../states/app-state.store';
import { MediaDeviceState, MediaDeviceStateStore } from '../../../../states/media-device-state.store';
import { WebcamComponent } from '../webcam/webcam.component';

import { SnapComponent } from './snap.component';

describe('SnapComponent', () => {
  let component: SnapComponent;
  let mediaDeviceStateStore: MediaDeviceStateStore;
  let logger: MockProxy<LoggerService>;
  let applicationConfigService: MockProxy<ApplicationConfigService>;
  let analyticsService: MockProxy<AnalyticsService>;
  let tvSearchService: MockProxy<TvSearchService>;
  let appStateStore: MockProxy<AppStateStore>;
  let webcamComponent: MockProxy<WebcamComponent>;
  let location: MockProxy<Location>;
  let notificationService: MockProxy<NotificationService>;
  let customerApplicationConfigService: MockProxy<CustomerApplicationConfigService>;
  let customerApplicationConfigLoaded$: ReplaySubject<boolean>;

  const webcamImage: ManipulatedImage = {
    blob: new Blob(),
    mimeType: 'image/jpeg',
    width: 512,
    height: 512,
  };

  beforeEach(() => {
    logger = mock<LoggerService>();
    applicationConfigService = mock<ApplicationConfigService>();
    customerApplicationConfigService = mock<CustomerApplicationConfigService>();
    analyticsService = mock<AnalyticsService>();
    tvSearchService = mock<TvSearchService>();
    appStateStore = mock<AppStateStore>();
    webcamComponent = mock<WebcamComponent>();
    location = mock<Location>();
    notificationService = mock<NotificationService>();

    TestBed.configureTestingModule({
      providers: [
        SnapComponent,
        { provide: LoggerService, useValue: logger },
        { provide: ApplicationConfigService, useValue: applicationConfigService },
        { provide: AnalyticsService, useValue: analyticsService },
        { provide: TvSearchService, useValue: tvSearchService },
        { provide: AppStateStore, useValue: appStateStore },
        { provide: NotificationService, useValue: notificationService },
        { provide: CustomerApplicationConfigService, useValue: customerApplicationConfigService },
        { provide: LOCATION, useValue: location },
      ],
    }).compileComponents();

    component = TestBed.inject(SnapComponent);
    component.webcamComponent = webcamComponent;
    mediaDeviceStateStore = TestBed.inject(MediaDeviceStateStore);
    mediaDeviceStateStore.dispatch(MediaDeviceState.DEVICE_INIT);
    appStateStore.getState.mockReturnValue(of(AppState.SNAP_READY));
    webcamComponent.triggerSnapshot.mockResolvedValue(webcamImage);

    customerApplicationConfigLoaded$ = new ReplaySubject<boolean>(1);
    customerApplicationConfigLoaded$.next(true);

    Object.defineProperty(customerApplicationConfigService, 'loaded$', {
      value: customerApplicationConfigLoaded$.asObservable(),
    });
  });

  describe('takeSnapshot', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should take snapshot and query api for snapOdd results', (done) => {
      tvSearchService.searchSport.mockReturnValue(of(sportEventTvSearchMock));

      component.takeSnapshot();

      setTimeout(() => {
        expect(notificationService.notify).toHaveBeenCalled();
        expect(applicationConfigService.emitResultsEvent).toHaveBeenCalledWith(sportEventTvSearchMock.resultEntries[0]);
        expect(appStateStore.dispatch).toHaveBeenCalledWith(AppState.SNAP_IN_PROGRESS);
        expect(tvSearchService.searchSport).toHaveBeenCalledWith(webcamImage.blob);

        expect(analyticsService.snapViewSnap).toHaveBeenCalled();
        expect(analyticsService.snapViewSnapResult).toHaveBeenCalled();
        expect(analyticsService.snapViewSnapFailed).not.toHaveBeenCalled();
        expect(analyticsService.snapViewSnapWithoutResult).not.toHaveBeenCalled();

        done();
      });
    });

    it('should report failed snap to analytic service when error', (done) => {
      tvSearchService.searchSport.mockReturnValue(
        throwError(
          () =>
            new HttpErrorResponse({
              error: '500 error',
              status: 500,
              statusText: 'Internal Server Error',
            })
        )
      );

      component.takeSnapshot();

      setTimeout(() => {
        expect(appStateStore.dispatch).toHaveBeenCalledWith(AppState.SNAP_FAILED);
        expect(analyticsService.snapViewSnap).toHaveBeenCalled();
        expect(analyticsService.snapViewSnapResult).not.toHaveBeenCalled();
        expect(analyticsService.snapViewSnapWithoutResult).not.toHaveBeenCalled();
        expect(analyticsService.snapViewSnapFailed).toHaveBeenCalled();

        done();
      });
    });

    it('should report negative snap to analytic service when no result error', (done) => {
      tvSearchService.searchSport.mockReturnValue(throwError(() => new TvSearchNoResultError('uuid-x123')));

      component.takeSnapshot();

      setTimeout(() => {
        expect(appStateStore.dispatch).toHaveBeenCalledWith(AppState.SNAP_NO_RESULTS);
        expect(analyticsService.snapViewSnap).toHaveBeenCalled();
        expect(analyticsService.snapViewSnapResult).not.toHaveBeenCalled();
        expect(analyticsService.snapViewSnapFailed).not.toHaveBeenCalled();
        expect(analyticsService.snapViewSnapWithoutResult).toHaveBeenCalled();

        done();
      });
    });
  });

  describe('autoSnap', () => {
    it('should search sport events near a timestamp by image', (done) => {
      tvSearchService.autoSearchSport.mockReturnValue(of(sportEventTvSearchMock));

      tvSearchService.autoSearchSport(webcamImage.blob).subscribe({
        next: (sportEventResult) => {
          expect(sportEventResult).toBe(sportEventTvSearchMock);
          expect(tvSearchService.autoSearchSport).toHaveBeenCalledWith(webcamImage.blob);
          done();
        },
        error: () => done.fail(),
      });
    });

    it('should retry snapping until a match has been found if autoSnap is enabled', (done) => {
      customerApplicationConfigService.isAutoSnapEnabled.mockReturnValue(true);

      tvSearchService.autoSearchSport.mockReturnValueOnce(throwError(() => new Error()));
      tvSearchService.autoSearchSport.mockReturnValueOnce(of(sportEventTvSearchMock));
      mediaDeviceStateStore.dispatch(MediaDeviceState.DEVICE_CAMERA_READY);

      component.ngOnInit();

      setTimeout(() => {
        expect(webcamComponent.triggerSnapshot).toHaveBeenCalledTimes(2);
        expect(applicationConfigService.emitResultsEvent).toHaveBeenCalledWith(sportEventTvSearchMock.resultEntries[0]);
        expect(appStateStore.dispatch).not.toHaveBeenCalledWith(AppState.SNAP_IN_PROGRESS);
        component.ngOnDestroy();

        done();
      }, 100);
    });

    it('should stop autoSnapping when maxRetryAttempts are reached', (done) => {
      const maxRetries = 3;

      customerApplicationConfigService.getAutoSnapMaxRetries.mockReturnValue(maxRetries);
      customerApplicationConfigService.isAutoSnapEnabled.mockReturnValue(true);

      tvSearchService.autoSearchSport.mockReturnValueOnce(throwError(() => new Error()));
      tvSearchService.autoSearchSport.mockReturnValueOnce(throwError(() => new Error()));
      tvSearchService.autoSearchSport.mockReturnValueOnce(throwError(() => new Error()));
      mediaDeviceStateStore.dispatch(MediaDeviceState.DEVICE_CAMERA_READY);

      component.ngOnInit();

      setTimeout(() => {
        expect(webcamComponent.triggerSnapshot).toHaveBeenCalledTimes(maxRetries);
        expect(applicationConfigService.emitResultsEvent).not.toHaveBeenCalled();
        component.ngOnDestroy();

        done();
      }, 100);
    });
  });

  describe('analytics', () => {
    it('should track snapViewOpened onInit', () => {
      component.ngOnInit();
      expect(analyticsService.snapViewOpened).toHaveBeenCalled();
    });

    it('should track snapViewClosed onDestroy', () => {
      component.ngOnDestroy();
      expect(analyticsService.snapViewClosed).toHaveBeenCalled();
    });
  });

  describe('appState', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should set state to SNAP_READY onInit', () => {
      expect(appStateStore.dispatch).toHaveBeenCalledWith(AppState.SNAP_READY);
    });

    it('should show the help page', () => {
      component.showHelpPage();
      expect(appStateStore.dispatch).toHaveBeenCalledWith(AppState.SHOW_HELP);
    });
  });

  it('should reload page', () => {
    component.reloadPage();
    expect(location.reload).toHaveBeenCalled();
  });
});
