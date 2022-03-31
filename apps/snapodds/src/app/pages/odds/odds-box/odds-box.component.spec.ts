import { TestBed } from '@angular/core/testing';
import { mock, MockProxy } from 'jest-mock-extended';
import { WINDOW } from '../../../../services/tokens/window-token';

import { OddsBoxComponent } from './odds-box.component';

describe('OddsBoxComponent', () => {
  let component: OddsBoxComponent;
  let window: MockProxy<Window>;

  beforeEach(() => {
    window = mock<Window>();

    TestBed.configureTestingModule({
      providers: [OddsBoxComponent, { provide: WINDOW, useValue: window }],
    }).compileComponents();

    component = TestBed.inject(OddsBoxComponent);
  });

  it('should open the outcomeUrl in a new tab', () => {
    const redirectUrl = 'https://example.com';
    component.openRedirectUrl(new MouseEvent('click'), redirectUrl);
    expect(window.open).toHaveBeenCalledWith(redirectUrl, '_blank');
  });
});
