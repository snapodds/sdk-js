import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SportsBookLineViewModel } from '../../../../models/sports-book-line-view-model';
import { OddsBoxComponent } from '../odds-box/odds-box.component';
import { BestOfferLinePipe } from '../pipes/best-offer.pipe';
import { NumberFormatPipe } from '../pipes/number-format.pipe';
import { OddsOrderingPipe } from '../pipes/odds-ordering.pipe';
import { OverUnderPipe } from '../pipes/over-under.pipe';
import { OddsLineComponent } from './odds-line.component';

describe('OddsLineComponent', () => {
  let component: OddsLineComponent;
  let fixture: ComponentFixture<OddsLineComponent>;

  const lineViewModel: SportsBookLineViewModel = {
    moneyline: 100,
    overUnder: 200,
    overUnderOdds: 5,
    spread: 50,
    spreadOdds: 10,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        OddsLineComponent,
        OddsOrderingPipe,
        BestOfferLinePipe,
        NumberFormatPipe,
        OverUnderPipe,
        OddsBoxComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OddsLineComponent);
    component = fixture.componentInstance;
    component.line = lineViewModel;
  });

  it('should render a line of odds for a competitor', () => {
    const competitorName = 'Chicago Bulls';

    component.competitorName = competitorName;
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('.c-odds-line__competitor')?.textContent?.trim()).toBe(competitorName);
    expect(element.querySelectorAll('snapodds-odds-box').length).toBe(3);
  });

  it('should render the odds in reversed order', () => {
    component.oddsOfferOrder = ['OVER_UNDER', 'MONEYLINE', 'SPREAD'];
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('snapodds-odds-box:nth-child(1)')?.classList.contains('l-order-3')).toBe(true);
    expect(element.querySelector('snapodds-odds-box:nth-child(2)')?.classList.contains('l-order-2')).toBe(true);
    expect(element.querySelector('snapodds-odds-box:nth-child(3)')?.classList.contains('l-order-1')).toBe(true);
  });
});
