import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OddsTableComponent } from './odds-table.component';

describe('OddsTableComponent', () => {
  let component: OddsTableComponent;
  let fixture: ComponentFixture<OddsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OddsTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OddsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
