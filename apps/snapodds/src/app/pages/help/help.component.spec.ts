import { TestBed } from '@angular/core/testing';
import { mock, MockProxy } from 'jest-mock-extended';
import { AppState, AppStateStore } from '../../../states/app-state.store';

import { HelpComponent } from './help.component';

describe('HelpComponent', () => {
  let component: HelpComponent;
  let appStateStore: MockProxy<AppStateStore>;

  beforeEach(async () => {
    appStateStore = mock<AppStateStore>();

    TestBed.configureTestingModule({
      providers: [HelpComponent, { provide: AppStateStore, useValue: appStateStore }],
    });

    component = TestBed.inject(HelpComponent);
  });

  it('should call storage service to mark help as visited', () => {
    component.showSnapPage();
    expect(appStateStore.dispatch).toHaveBeenCalledWith(AppState.SNAP_READY);
  });
});
