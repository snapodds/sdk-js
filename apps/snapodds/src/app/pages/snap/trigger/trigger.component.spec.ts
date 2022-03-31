import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TriggerSvgComponent } from '../svgs/trigger.svg.component';

import { TriggerComponent } from './trigger.component';

describe('TriggerComponent', () => {
  let component: TriggerComponent;
  let fixture: ComponentFixture<TriggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TriggerComponent, TriggerSvgComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
