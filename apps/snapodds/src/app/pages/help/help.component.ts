import { Component } from '@angular/core';
import { AppState, AppStateStore } from '../../../states/app-state.store';

@Component({
  selector: 'snapodds-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent {
  constructor(private readonly appStateStore: AppStateStore) {}

  /**
   * Navigate to the Snap Page by setting the corresponding AppState
   */
  showSnapPage(): void {
    this.appStateStore.dispatch(AppState.SNAP_READY);
  }
}
