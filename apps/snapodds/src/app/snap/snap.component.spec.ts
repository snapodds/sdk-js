import { TestBed } from '@angular/core/testing';
import { sportEventTvSearchMock } from '@response/mocks';
import { mock, MockProxy } from 'jest-mock-extended';
import { of, throwError } from 'rxjs';
import { ApplicationConfigService } from '../../services/config/application-config.service';
import { ManipulatedImage } from '../../services/image-manipulation/manipulated-image';
import { LoggerService } from '../../services/logger/logger.service';
import { NotificationService } from '../../services/notification/notification.service';
import { TvSearchNoResultError } from '../../services/snap-odds/snap-odds-errors';
import { SnapOddsFacade } from '../../services/snap-odds/snap-odds-facade.service';
import { LOCATION } from '../../services/tokens/location-token';
import { GoogleAnalyticsService } from '../../services/tracking/google-analytics.service';
import { AppState, AppStateStore } from '../../states/app-state.store';
import { MediaDeviceState, MediaDeviceStateStore } from '../../states/media-device-state.store';
import { WebcamComponent } from '../webcam/webcam.component';

import { SnapComponent } from './snap.component';

describe('SnapComponent', () => {
  let component: SnapComponent;
  let mediaDeviceStateStore: MediaDeviceStateStore;
  let logger: MockProxy<LoggerService>;
  let applicationConfigService: MockProxy<ApplicationConfigService>;
  let analyticsService: MockProxy<GoogleAnalyticsService>;
  let snapOddsFacade: MockProxy<SnapOddsFacade>;
  let appStateStore: MockProxy<AppStateStore>;
  let webcamComponent: MockProxy<WebcamComponent>;
  let location: MockProxy<Location>;
  let notificationService: MockProxy<NotificationService>;

  const webcamImage: ManipulatedImage = {
    blob: new Blob(),
    mimeType: 'image/jpeg',
    width: 512,
    height: 512,
  };

  beforeEach(() => {
    logger = mock<LoggerService>();
    applicationConfigService = mock<ApplicationConfigService>();
    analyticsService = mock<GoogleAnalyticsService>();
    snapOddsFacade = mock<SnapOddsFacade>();
    appStateStore = mock<AppStateStore>();
    webcamComponent = mock<WebcamComponent>();
    location = mock<Location>();
    notificationService = mock<NotificationService>();

    TestBed.configureTestingModule({
      providers: [
        SnapComponent,
        { provide: LoggerService, useValue: logger },
        { provide: ApplicationConfigService, useValue: applicationConfigService },
        { provide: GoogleAnalyticsService, useValue: analyticsService },
        { provide: SnapOddsFacade, useValue: snapOddsFacade },
        { provide: AppStateStore, useValue: appStateStore },
        { provide: NotificationService, useValue: notificationService },
        { provide: LOCATION, useValue: location },
      ],
    }).compileComponents();

    component = TestBed.inject(SnapComponent);
    component.webcamComponent = webcamComponent;
    mediaDeviceStateStore = TestBed.inject(MediaDeviceStateStore);
    mediaDeviceStateStore.dispatch(MediaDeviceState.DEVICE_INIT);
    appStateStore.getState.mockReturnValue(of(AppState.SNAP_READY));
    webcamComponent.triggerSnapshot.mockResolvedValue(webcamImage);
  });

  it('should take snapshot and query api for snapOdd results', (done) => {
    snapOddsFacade.getSnap.mockReturnValue(of(sportEventTvSearchMock));

    component.ngOnInit();
    component.takeSnapshot();

    setTimeout(() => {
      expect(notificationService.notify).toHaveBeenCalled();
      expect(applicationConfigService.emitResultsEvent).toHaveBeenCalledWith(sportEventTvSearchMock.resultEntries[0]);
      expect(appStateStore.dispatch).toHaveBeenCalledWith(AppState.SNAP_IN_PROGRESS);
      expect(snapOddsFacade.getSnap).toHaveBeenCalledWith(webcamImage.blob, false);

      done();
    });
  });

  it('should retry snapping until a match has been found if autoSnap is enabled', (done) => {
    applicationConfigService.isAutoSnapEnabled.mockReturnValue(true);

    snapOddsFacade.getSnap.mockReturnValueOnce(throwError(() => new Error()));
    snapOddsFacade.getSnap.mockReturnValueOnce(of(sportEventTvSearchMock));
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

    it('should set state to SNAP_NO_RESULTS if getSnap returns SnapOddsNoResultError', (done) => {
      snapOddsFacade.getSnap.mockReturnValue(throwError(() => new TvSearchNoResultError()));

      component.takeSnapshot();

      setTimeout(() => {
        expect(appStateStore.dispatch).toHaveBeenCalledWith(AppState.SNAP_NO_RESULTS);
        done();
      });
    });

    it('should set state to SNAP_FAILED if getSnap failed', (done) => {
      snapOddsFacade.getSnap.mockReturnValue(throwError(() => new Error('ERROR')));

      component.takeSnapshot();

      setTimeout(() => {
        expect(appStateStore.dispatch).toHaveBeenCalledWith(AppState.SNAP_FAILED);
        done();
      });
    });
  });

  it('should show the help page', () => {
    component.showHelpPage();
    expect(appStateStore.dispatch).toHaveBeenCalledWith(AppState.SHOW_HELP);
  });

  it('should reload page', () => {
    component.reloadPage();
    expect(location.reload).toHaveBeenCalled();
  });
});
