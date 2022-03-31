import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { sportEventTvSearchMock } from '@response/mocks';
import { TvSearchResultEntry } from '@response/typings';
import { mock, MockProxy } from 'jest-mock-extended';
import { of, throwError } from 'rxjs';
import { register } from 'timezone-mock';
import { lineOddsMapped } from '../../../../services/api/line-odds.mapped';
import { OddsService } from '../../../../services/api/odds.service';
import { WINDOW } from '../../../../services/tokens/window-token';
import { ContentComponent } from '../../../shared/content/content.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { OddsBoxComponent } from '../odds-box/odds-box.component';
import { OddsHeaderComponent } from '../odds-header/odds-header.component';
import { OddsLineComponent } from '../odds-line/odds-line.component';
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

  const tvSearchResultEntry: TvSearchResultEntry = sportEventTvSearchMock.resultEntries[0];

  beforeEach(async () => {
    window = mock<Window>();
    oddsService = mock<OddsService>();

    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), HttpClientTestingModule],
      providers: [
        { provide: WINDOW, useValue: window },
        { provide: OddsService, useValue: oddsService },
      ],
      declarations: [
        OddsComponent,
        OddsLineComponent,
        OddsBoxComponent,
        OddsHeaderComponent,
        HeaderComponent,
        ContentComponent,
        BestOfferLinePipe,
        NumberFormatPipe,
        OverUnderPipe,
        OddsOrderingPipe,
      ],
    }).compileComponents();

    register('UTC');
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

    const tournament = element.querySelector('.c-sport-event__tournament-info');
    expect(tournament?.textContent?.trim()).toEqual(
      `${tvSearchResultEntry.sportEvent.league} @ ${tvSearchResultEntry.tvChannel.name}`
    );

    const channel = element.querySelector('.c-sport-event__time-of-day');
    expect(channel?.textContent?.trim()).toEqual(`9/6/21, 1:40 AM`);

    const sportsBooks = element.querySelectorAll<HTMLElement>('.c-game');
    expect(sportsBooks).toHaveLength(expectedSportsBooks + expectedBestOffer);

    const lines = element.querySelectorAll<HTMLElement>('snapodds-odds-line');
    expect(lines).toHaveLength((expectedSportsBooks + expectedBestOffer) * 2);
  });

  it('should load lineOdds when sportEvents are changed', () => {
    oddsService.gameLineOddsBySportEventId.mockReturnValue(of(lineOddsMapped));

    component.ngOnChanges({ tvSearchResultEntry: new SimpleChange(null, tvSearchResultEntry, true) });

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
