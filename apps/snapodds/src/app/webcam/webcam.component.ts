import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PinchZoomComponent } from 'ngx-pinch-zoom';
import { WebcamComponent as NgxWebcamComponent, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApplicationConfigService } from '../../services/config/application-config.service';
import { ImageManipulationService } from '../../services/image-manipulation/image-manipulation.service';
import { ManipulatedImage } from '../../services/image-manipulation/manipulated-image';
import { LoggerService } from '../../services/logger/logger.service';
import { AppState, AppStateStore } from '../../states/app-state.store';
import { MediaDeviceState, MediaDeviceStateStore } from '../../states/media-device-state.store';

@Component({
  selector: 'snapodds-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss'],
})
export class WebcamComponent implements OnInit, AfterViewInit {
  imageAsDataUrl: string | ArrayBuffer | null | undefined;
  videoOptions: MediaTrackConstraints = {
    facingMode: { ideal: 'environment' },
    width: { min: 320, ideal: 1920, max: 2560 },
  };

  @ViewChild(NgxWebcamComponent) webcamComponent!: NgxWebcamComponent;
  @ViewChild(NgxWebcamComponent, { read: ElementRef }) webcamComponentElement!: ElementRef<NgxWebcamComponent>;
  @ViewChild(PinchZoomComponent) pinchZoomComponent!: PinchZoomComponent;
  @ViewChild('viewFinder') viewFinder!: ElementRef;

  hasMultipleWebcams = false;

  private nextWebcam: Subject<boolean | string> = new Subject();
  nextWebcam$: Observable<boolean | string> = this.nextWebcam.asObservable();

  constructor(
    private readonly imageManipulationService: ImageManipulationService,
    private readonly applicationConfigService: ApplicationConfigService,
    private readonly appStateStore: AppStateStore,
    private readonly logger: LoggerService,
    readonly mediaDeviceStateStore: MediaDeviceStateStore
  ) {}

  /**
   * Verifies the available video inputs and if none are found triggers the rendering of the error view
   */
  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs().then((mediaDevices: MediaDeviceInfo[]) => {
      this.hasMultipleWebcams = mediaDevices.length > 1;

      if (mediaDevices.length === 0) {
        this.mediaDeviceStateStore.dispatch(MediaDeviceState.DEVICE_NO_CAMERA);
        this.appStateStore.dispatch(AppState.DEVICE_NO_CAMERA);
      }
    });
  }

  /**
   * After the view and its components are initialized, the zoom library will be patched to only allow zoom on center
   */
  ngAfterViewInit(): void {
    this.centerContentOnZoom();
  }

  /**
   * Takes a snapshot from the webcams video stream and crops it to the area that is visible to the user.
   *
   * If the `environment.debugImageManipulations` is turned on will render the cropped image in the browser for verification
   *
   * @throws 'Debug webcam image' to interrupt further processing when debugImageManipulations is turned on.
   *
   */
  triggerSnapshot(): Promise<ManipulatedImage> {
    return this.imageManipulationService
      .cropAndResizeImage(
        this.webcamComponent.nativeVideoElement,
        this.getViewFinder(),
        this.pinchZoomComponent.scale,
        this.applicationConfigService.getSnapDimension()
      )
      .then((manipulatedImage) => {
        if (this.debugImageManipulations()) {
          this.drawDebugImage(manipulatedImage.blob);
          throw 'Debug webcam image';
        }
        this.logger.info('Received webcam image', manipulatedImage);
        return manipulatedImage;
      });
  }

  /**
   * If `autoSnap` is enabled then only the tv-frame is used as viewFinder, otherwise the whole visible are is used.
   * @private
   */
  private getViewFinder(): HTMLElement {
    return this.applicationConfigService.isAutoSnapEnabled()
      ? this.viewFinder.nativeElement
      : this.webcamComponentElement.nativeElement;
  }

  /**
   * Converts a blob image into a dataUrl which can be rendered in the template
   * @param blob
   * @private
   */
  private drawDebugImage(blob: Blob): void {
    const reader = new FileReader();
    reader.onloadend = () => (this.imageAsDataUrl = reader.result);
    reader.readAsDataURL(blob);
  }

  /**
   * If the device can't be accessed, triggers the rendering of the according error page.
   * @param error
   */
  handleInitError(error: WebcamInitError): void {
    this.mediaDeviceStateStore.dispatch(MediaDeviceState.DEVICE_NO_PERMISSION);
    this.appStateStore.dispatch(AppState.DEVICE_NO_PERMISSION);
    this.logger.error('Failed to initialize webcam', error);
  }

  /**
   * Toggles between available webcams
   */
  switchToNextWebcam(): void {
    this.nextWebcam.next(true);
  }

  /**
   * Callback which is executed when the video stream of a webcam is ready for further processing.
   * @param deviceId: the webcams device id inside the browser
   */
  cameraSwitched(deviceId: string) {
    this.mediaDeviceStateStore.dispatch(MediaDeviceState.DEVICE_CAMERA_READY);
    this.logger.info('Camera device switched. DeviceId:', deviceId);
  }

  /**
   * Used to determine if the debug output of the manipulated image should be shown or not
   */
  debugImageManipulations(): boolean {
    return environment.debugImageManipulations;
  }

  /**
   * Patches the ngx-pinch-zoom component by not taking the cursors offset into account when zooming into the video stream.
   * @private
   */
  private centerContentOnZoom(): void {
    Object.defineProperty(this.pinchZoomComponent.pinchZoom, 'moveX', {
      get() {
        return -Math.abs((this.element.offsetWidth * (1 - this.scale)) / 2);
      },
      set() {
        return;
      },
    });

    Object.defineProperty(this.pinchZoomComponent.pinchZoom, 'moveY', {
      get() {
        return -Math.abs((this.element.offsetHeight * (1 - this.scale)) / 2);
      },
      set() {
        return;
      },
    });
  }
}
