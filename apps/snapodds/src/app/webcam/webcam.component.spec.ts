import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { mock, MockProxy } from 'jest-mock-extended';
import { PinchZoomComponent } from 'ngx-pinch-zoom';
import { WebcamComponent as NgxWebcamComponent, WebcamUtil } from 'ngx-webcam';
import { ApplicationConfigService } from '../../services/config/application-config.service';
import { ImageManipulationService } from '../../services/image-manipulation/image-manipulation.service';
import { ManipulatedImage } from '../../services/image-manipulation/manipulated-image';
import { LoggerService } from '../../services/logger/logger.service';
import { AppState, AppStateStore } from '../../states/app-state.store';
import { MediaDeviceState, MediaDeviceStateStore } from '../../states/media-device-state.store';
import { WebcamComponent } from './webcam.component';

describe('WebcamComponent', () => {
  let component: WebcamComponent;
  let webcamComponent: MockProxy<NgxWebcamComponent>;
  let webcamComponentElement: MockProxy<ElementRef>;
  let pinchZoomComponent: MockProxy<PinchZoomComponent>;
  let viewFinder: MockProxy<ElementRef>;

  let applicationConfigService: MockProxy<ApplicationConfigService>;
  let logger: MockProxy<LoggerService>;
  let imageManipulationService: MockProxy<ImageManipulationService>;
  let appStateStore: MockProxy<AppStateStore>;
  let mediaDeviceStateStore: MockProxy<MediaDeviceStateStore>;

  const webcamImage: ManipulatedImage = {
    blob: new Blob(),
    mimeType: 'image/jpeg',
    width: 512,
    height: 512,
  };

  beforeEach(async () => {
    imageManipulationService = mock<ImageManipulationService>();
    applicationConfigService = mock<ApplicationConfigService>();
    appStateStore = mock<AppStateStore>();
    mediaDeviceStateStore = mock<MediaDeviceStateStore>();
    logger = mock<LoggerService>();
    webcamComponent = mock<NgxWebcamComponent>();
    webcamComponentElement = mock<ElementRef>();
    pinchZoomComponent = mock<PinchZoomComponent>();
    viewFinder = mock<ElementRef>();

    TestBed.configureTestingModule({
      providers: [
        WebcamComponent,
        { provide: ImageManipulationService, useValue: imageManipulationService },
        { provide: ApplicationConfigService, useValue: applicationConfigService },
        { provide: AppStateStore, useValue: appStateStore },
        { provide: MediaDeviceStateStore, useValue: mediaDeviceStateStore },
        { provide: LoggerService, useValue: logger },
      ],
    });

    component = TestBed.inject(WebcamComponent);
    component.webcamComponent = webcamComponent;
    component.webcamComponentElement = webcamComponentElement;
    component.pinchZoomComponent = pinchZoomComponent;
    component.viewFinder = viewFinder;
  });

  describe('triggerSnapshot', () => {
    const dimensions = 256;

    beforeEach(() => {
      imageManipulationService.cropAndResizeImage.mockResolvedValue(webcamImage);
      applicationConfigService.getSnapDimension.mockReturnValue(dimensions);
    });

    it('should take a snapshot from the video element', async () => {
      applicationConfigService.isAutoSnapEnabled.mockReturnValue(false);

      const snapshot = await component.triggerSnapshot();

      expect(snapshot).toBe(webcamImage);
      expect(imageManipulationService.cropAndResizeImage).toHaveBeenCalledWith(
        webcamComponent.nativeVideoElement,
        webcamComponentElement.nativeElement,
        pinchZoomComponent.scale,
        dimensions
      );
    });

    it('should take a snapshot from the video element and crop the viewfinder', async () => {
      applicationConfigService.isAutoSnapEnabled.mockReturnValue(true);

      const snapshot = await component.triggerSnapshot();

      expect(snapshot).toBe(webcamImage);
      expect(imageManipulationService.cropAndResizeImage).toHaveBeenCalledWith(
        webcamComponent.nativeVideoElement,
        viewFinder.nativeElement,
        pinchZoomComponent.scale,
        dimensions
      );
    });
  });

  it('should update the appState if device could not be initialized', () => {
    const message = 'webcam init failed';
    const error = { message, mediaStreamError: new DOMException(message) };

    component.handleInitError(error);

    expect(appStateStore.dispatch).toHaveBeenCalledWith(AppState.DEVICE_NO_PERMISSION);
    expect(logger.error).toHaveBeenCalledWith('Failed to initialize webcam', error);
  });

  it('should switch to next webcam', () => {
    component.switchToNextWebcam();

    component.nextWebcam$.subscribe((flag) => {
      expect(flag).toBe(true);
    });
  });

  it('should log if camera is switched to next webcam', () => {
    const deviceId = 'deviceId';

    component.cameraSwitched(deviceId);

    expect(mediaDeviceStateStore.dispatch).toHaveBeenCalledWith(MediaDeviceState.DEVICE_CAMERA_READY);
    expect(logger.info).toHaveBeenCalledWith('Camera device switched. DeviceId:', deviceId);
  });

  it('should dispatch DEVICE_NO_CAMERA on both stateStores if none mediaDevices are found', (done) => {
    WebcamUtil.getAvailableVideoInputs = jest.fn().mockResolvedValue([]);

    component.ngOnInit();

    setTimeout(() => {
      expect(component.hasMultipleWebcams).toBe(false);
      expect(mediaDeviceStateStore.dispatch).toHaveBeenCalledWith(MediaDeviceState.DEVICE_NO_CAMERA);
      expect(appStateStore.dispatch).toHaveBeenCalledWith(AppState.DEVICE_NO_CAMERA);
      done();
    });
  });

  it('should set if multiple webcam devices are available', (done) => {
    const mediaDevice = {} as MediaDeviceInfo;
    WebcamUtil.getAvailableVideoInputs = jest.fn().mockResolvedValue([mediaDevice, mediaDevice]);

    component.ngOnInit();

    setTimeout(() => {
      expect(component.hasMultipleWebcams).toBe(true);
      expect(mediaDeviceStateStore.dispatch).not.toHaveBeenCalled();
      expect(appStateStore.dispatch).not.toHaveBeenCalled();
      done();
    });
  });
});
