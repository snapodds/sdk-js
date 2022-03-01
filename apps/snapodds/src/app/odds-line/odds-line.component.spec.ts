import { TestBed } from '@angular/core/testing';
import { mock, MockProxy } from 'jest-mock-extended';
import { WINDOW } from '../../services/tokens/window-token';

import { OddsLineComponent } from './odds-line.component';

describe('OddsLineComponent', () => {
  let component: OddsLineComponent;
  let window: MockProxy<Window>;

  beforeEach(() => {
    window = mock<Window>();

    TestBed.configureTestingModule({
      providers: [OddsLineComponent, { provide: WINDOW, useValue: window }],
    }).compileComponents();

    component = TestBed.inject(OddsLineComponent);
  });

  it('should open the outcomeUrl in a new tab', () => {
    const redirectUrl = 'https://example.com';
    component.openOutcomeRedirectUrl(new MouseEvent('click'), redirectUrl);
    expect(window.open).toHaveBeenCalledWith(redirectUrl, '_blank');
  });
});
