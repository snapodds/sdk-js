import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { sportEventTvSearchMock } from '@response/mocks';
import { TvSearchResultEntry } from '@response/typings';
import { mock, MockProxy } from 'jest-mock-extended';
import { of, ReplaySubject, throwError } from 'rxjs';
import { lineOddsMapped } from '../../../../services/api/line-odds.mapped';
import { OddsService } from '../../../../services/api/odds.service';
import { CustomerApplicationConfigService } from '../../../../services/config/customer-application-config.service';
import { WINDOW } from '../../../../services/tokens/window-token';
import { AnalyticsService } from '../../../../services/tracking/analytics.service';
import { ContentComponent } from '../../../shared/content/content.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { OddsBoxComponent } from '../odds-box/odds-box.component';
import { OddsGameInfoComponent } from '../odds-game-info/odds-game-info.component';
import { OddsHeaderLineComponent } from '../odds-header-line/odds-header-line.component';
import { OddsLineComponent } from '../odds-line/odds-line.component';
import { OddsTableComponent } from '../odds-table/odds-table.component';
import { BestOfferLinePipe } from '../pipes/best-offer.pipe';
import { NumberFormatPipe } from '../pipes/number-format.pipe';
import { OddsOrderingPipe } from '../pipes/odds-ordering.pipe';
import { OverUnderPipe } from '../pipes/over-under.pipe';

import { OddsComponent } from './odds.component';

describe('OddsComponent', () => {
  let component: OddsComponent;
  let fixture: ComponentFixture<OddsComponent>;
  let window: MockProxy<Window>;
  let oddsService: MockProxy<OddsService>;
  let analyticsService: MockProxy<AnalyticsService>;
  let customerApplicationConfigService: MockProxy<CustomerApplicationConfigService>;
  let customerApplicationConfigLoaded$: ReplaySubject<boolean>;

  const tvSearchResultEntry: TvSearchResultEntry = sportEventTvSearchMock.resultEntries[0];

  beforeEach(async () => {
    window = mock<Window>();
    oddsService = mock<OddsService>();
    analyticsService = mock<AnalyticsService>();
    customerApplicationConfigService = mock<CustomerApplicationConfigService>();
    customerApplicationConfigLoaded$ = new ReplaySubject<boolean>(1);
    customerApplicationConfigLoaded$.next(true);

    Object.defineProperty(customerApplicationConfigService, 'loaded$', {
      value: customerApplicationConfigLoaded$.asObservable(),
    });

    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), HttpClientTestingModule],
      providers: [
        { provide: WINDOW, useValue: window },
        { provide: OddsService, useValue: oddsService },
        { provide: AnalyticsService, useValue: analyticsService },
        { provide: CustomerApplicationConfigService, useValue: customerApplicationConfigService },
      ],
      declarations: [
        OddsComponent,
        OddsLineComponent,
        OddsBoxComponent,
        OddsHeaderLineComponent,
        HeaderComponent,
        ContentComponent,
        BestOfferLinePipe,
        NumberFormatPipe,
        OverUnderPipe,
        OddsOrderingPipe,
        OddsTableComponent,
        OddsGameInfoComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OddsComponent);
    component = fixture.componentInstance;
    component.tvSearchResultEntry = tvSearchResultEntry;
    component.lineOdds = lineOddsMapped;
    fixture.detectChanges();
  });

  it('should render the sport event', () => {
    const element: HTMLElement = fixture.nativeElement;
    const expectedSportsBooks = lineOddsMapped.sportsBooks?.length ?? 0;
    const expectedBestOffer = lineOddsMapped.bestOffer ? 1 : 0;

    const gameInfo = element.querySelectorAll<HTMLElement>('snapodds-odds-game-info');
    expect(gameInfo).toHaveLength(1);

    const sportsBooks = element.querySelectorAll<HTMLElement>('snapodds-odds-table');
    expect(sportsBooks).toHaveLength(expectedSportsBooks + expectedBestOffer);

    const lines = element.querySelectorAll<HTMLElement>('snapodds-odds-line');
    expect(lines).toHaveLength((expectedSportsBooks + expectedBestOffer) * 2);
  });

  it('should load lineOdds when sportEvents are changed', () => {
    oddsService.gameLineOddsBySportEventId.mockReturnValue(of(lineOddsMapped));

    component.ngOnChanges({ tvSearchResultEntry: new SimpleChange(null, tvSearchResultEntry, true) });

    expect(analyticsService.snapOddsOpen).toHaveBeenCalledWith({ sportevent_id: tvSearchResultEntry.sportEvent.id });
    expect(component.lineOdds).toBe(lineOddsMapped);
    expect(oddsService.gameLineOddsBySportEventId).toHaveBeenCalledWith(tvSearchResultEntry.sportEvent.id);
    expect(component.noResults).toBe(false);
    expect(component.loading).toBe(false);
  });

  it('should show noResults if loading lineOdds failed', () => {
    oddsService.gameLineOddsBySportEventId.mockReturnValue(throwError(() => new Error()));

    component.ngOnChanges({ tvSearchResultEntry: new SimpleChange(null, tvSearchResultEntry, true) });

    expect(oddsService.gameLineOddsBySportEventId).toHaveBeenCalledWith(tvSearchResultEntry.sportEvent.id);
    expect(component.lineOdds).toBe(null);
    expect(component.noResults).toBe(true);
    expect(component.loading).toBe(false);
  });

  it('should show noResults if sportsBooks are empty ', () => {
    oddsService.gameLineOddsBySportEventId.mockReturnValue(of({ ...lineOddsMapped, sportsBooks: [] }));

    component.ngOnChanges({ tvSearchResultEntry: new SimpleChange(null, tvSearchResultEntry, true) });

    expect(oddsService.gameLineOddsBySportEventId).toHaveBeenCalledWith(tvSearchResultEntry.sportEvent.id);
    expect(component.lineOdds).toBe(null);
    expect(component.noResults).toBe(true);
    expect(component.loading).toBe(false);
  });

  it('should show noResults if no sportsBooks', () => {
    oddsService.gameLineOddsBySportEventId.mockReturnValue(of({ ...lineOddsMapped, sportsBooks: undefined }));

    component.ngOnChanges({ tvSearchResultEntry: new SimpleChange(null, tvSearchResultEntry, true) });

    expect(oddsService.gameLineOddsBySportEventId).toHaveBeenCalledWith(tvSearchResultEntry.sportEvent.id);
    expect(component.lineOdds).toBe(null);
    expect(component.noResults).toBe(true);
    expect(component.loading).toBe(false);
  });

  it('should open the outcomeUrl in a new tab', () => {
    const redirectUrl = 'https://example.com';
    component.openSportsBookRedirectUrl(new MouseEvent('click'), redirectUrl);
    expect(window.open).toHaveBeenCalledWith(redirectUrl, '_blank');
  });
});
