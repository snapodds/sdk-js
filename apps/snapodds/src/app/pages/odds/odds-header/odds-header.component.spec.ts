import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OddsOrderingPipe } from '../pipes/odds-ordering.pipe';

import { OddsHeaderComponent } from './odds-header.component';

describe('OddsHeaderComponent', () => {
  let component: OddsHeaderComponent;
  let fixture: ComponentFixture<OddsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OddsHeaderComponent, OddsOrderingPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OddsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
