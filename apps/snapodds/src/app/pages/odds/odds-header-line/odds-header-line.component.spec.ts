import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OddsOrderingPipe } from '../pipes/odds-ordering.pipe';

import { OddsHeaderLineComponent } from './odds-header-line.component';

describe('OddsHeaderLineComponent', () => {
  let component: OddsHeaderLineComponent;
  let fixture: ComponentFixture<OddsHeaderLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OddsHeaderLineComponent, OddsOrderingPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OddsHeaderLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
