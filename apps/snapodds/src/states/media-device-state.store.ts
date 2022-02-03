import { Injectable } from '@angular/core';
import { filter, mapTo, Observable, ReplaySubject } from 'rxjs';

/**
 * The various MediaDeviceState which are used rendering user feedback
 */
export enum MediaDeviceState {
  DEVICE_INIT = 'DEVICE_INIT',
  DEVICE_CAMERA_READY = 'DEVICE_CAMERA_READY',
  DEVICE_NO_PERMISSION = 'DEVICE_NO_PERMISSION',
  DEVICE_NO_CAMERA = 'DEVICE_NO_CAMERA',
}

@Injectable({ providedIn: 'root' })
export class MediaDeviceStateStore {
  private readonly _state = new ReplaySubject<MediaDeviceState>(1);
  private readonly state$: Observable<MediaDeviceState> = this._state.asObservable();

  /**
   * Emits when a webcam is ready for interaction
   */
  readonly webcamIsReady$: Observable<boolean> = this.getState().pipe(
    filter((state) => state === MediaDeviceState.DEVICE_CAMERA_READY),
    mapTo(true)
  );

  /**
   * Listen to changes on the MediaDeviceState
   */
  getState(): Observable<MediaDeviceState> {
    return this.state$;
  }

  /**
   * Trigger an MediaDeviceState change
   * @param state
   */
  dispatch(state: MediaDeviceState): void {
    this._state.next(state);
  }
}
