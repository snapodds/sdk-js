import { TestBed } from '@angular/core/testing';
import { MediaDeviceState, MediaDeviceStateStore } from './media-device-state.store';

describe('MediaDeviceStateStore', () => {
  let store: MediaDeviceStateStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(MediaDeviceStateStore);
  });

  it('should update the store after it has been dispatched', (done) => {
    store.getState().subscribe((state) => {
      expect(state).toBe(MediaDeviceState.DEVICE_INIT);
      done();
    });
    store.dispatch(MediaDeviceState.DEVICE_INIT);
  });

  it('should emit if webcam is ready', (done) => {
    store.webcamIsReady$.subscribe((state) => {
      expect(state).toBe(true);
      done();
    });

    store.dispatch(MediaDeviceState.DEVICE_CAMERA_READY);
  });
});
