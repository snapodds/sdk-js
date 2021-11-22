import { TestBed } from '@angular/core/testing';
import { mock, MockProxy } from 'jest-mock-extended';
import { ApplicationConfigService } from '../config/application-config.service';
import { NAVIGATOR } from '../tokens/navigator-token';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let applicationConfigService: MockProxy<ApplicationConfigService>;
  let navigator: MockProxy<Navigator>;

  beforeEach(() => {
    applicationConfigService = mock<ApplicationConfigService>();
    navigator = mock<Navigator>();

    TestBed.configureTestingModule({
      providers: [
        { provide: ApplicationConfigService, useValue: applicationConfigService },
        { provide: NAVIGATOR, useValue: navigator },
      ],
    });

    service = TestBed.inject(NotificationService);
  });

  it('should trigger vibration', () => {
    applicationConfigService.isVibrateEnabled.mockReturnValue(true);
    service.notify();
    expect(navigator.vibrate).toHaveBeenCalled();
  });

  it('should not trigger vibration', () => {
    applicationConfigService.isVibrateEnabled.mockReturnValue(false);
    service.notify();
    expect(navigator.vibrate).not.toHaveBeenCalled();
  });
});
