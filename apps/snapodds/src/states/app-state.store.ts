import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject } from 'rxjs';

export enum AppState {
  SHOW_HELP = 'SHOW_HELP',
  SHOW_ODDS = 'SHOW_ODDS',
  SNAP_READY = 'SNAP_READY',
  SNAP_IN_PROGRESS = 'SNAP_IN_PROGRESS',
  SNAP_FAILED = 'SNAP_FAILED',
  SNAP_NO_RESULTS = 'SNAP_NO_RESULTS',
  DEVICE_NO_CAMERA = 'DEVICE_NO_CAMERA',
  DEVICE_NO_PERMISSION = 'DEVICE_NO_PERMISSION',
}

@Injectable({ providedIn: 'root' })
export class AppStateStore {
  private readonly _state = new ReplaySubject<AppState>(1);
  private readonly state$: Observable<AppState> = this._state.asObservable();
  readonly showHelp$ = this.getState().pipe(map((state) => state === AppState.SHOW_HELP));

  getState(): Observable<AppState> {
    return this.state$;
  }

  dispatch(state: AppState): void {
    this._state.next(state);
  }
}
