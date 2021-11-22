import { TestBed } from '@angular/core/testing';
import { mock, MockProxy } from 'jest-mock-extended';
import { ApplicationConfigService } from '../../services/config/application-config.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let applicationConfigService: MockProxy<ApplicationConfigService>;

  beforeEach(() => {
    applicationConfigService = mock<ApplicationConfigService>();

    TestBed.configureTestingModule({
      providers: [HeaderComponent, { provide: ApplicationConfigService, useValue: applicationConfigService }],
    });

    component = TestBed.inject(HeaderComponent);
  });

  it('should call the close event', () => {
    component.cancelSnap();
    expect(applicationConfigService.emitCloseEvent).toHaveBeenCalled();
  });
});
