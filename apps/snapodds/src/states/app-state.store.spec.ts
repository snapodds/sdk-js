import { TestBed } from '@angular/core/testing';
import { AppState, AppStateStore } from './app-state.store';

describe('AppStateStore', () => {
  let store: AppStateStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(AppStateStore);
  });

  it('should update the store after it has been dispatched', (done) => {
    store.getState().subscribe((state) => {
      expect(state).toBe(AppState.SNAP_READY);
      done();
    });
    store.dispatch(AppState.SNAP_READY);
  });

  it('should emit if help page should be shown', (done) => {
    store.showHelp$.subscribe((state) => {
      expect(state).toBe(true);
      done();
    });

    store.dispatch(AppState.SHOW_HELP);
  });
});
