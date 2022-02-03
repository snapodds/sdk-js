import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { sportEventTvSearchMock } from '@response/mocks';
import { TvSearchResultEntry } from '@response/typings';
import { mock, MockProxy } from 'jest-mock-extended';
import { of, throwError } from 'rxjs';
import { register } from 'timezone-mock';
import { lineOddsMapped } from '../../services/api/line-odds.mapped';
import { OddsService } from '../../services/api/odds.service';
import { WINDOW } from '../../services/tokens/window-token';
import { ContentComponent } from '../content/content.component';
import { HeaderComponent } from '../header/header.component';

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
      declarations: [OddsComponent, HeaderComponent, ContentComponent],
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

    const tournament = element.querySelector('.c-sport-event__tournament');
    expect(tournament?.textContent).toEqual(tvSearchResultEntry.sportEvent.tournament);

    const channel = element.querySelector('.c-sport-event__channel');
    expect(channel?.textContent).toEqual(`${tvSearchResultEntry.tvChannel.name} since 01:40 AM`);

    const sportBook = element.querySelectorAll<HTMLElement>('.c-game');
    expect(sportBook).toHaveLength(lineOddsMapped.sportsBooks?.length ?? 0);

    const lines = element.querySelectorAll<HTMLElement>('a.c-game-line');
    expect(lines).toHaveLength((lineOddsMapped.sportsBooks?.length ?? 0) * 2);
  });

  it('should open the outcomeUrl in a new tab', () => {
    const redirectUrl = 'https://example.com';
    component.openOutcomeRedirectUrl(new MouseEvent('click'), redirectUrl);
    expect(window.open).toHaveBeenCalledWith(redirectUrl, '_blank');
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

  it('should show noResults if sportBooks are empty ', () => {
    oddsService.gameLineOddsBySportEventId.mockReturnValue(of({ ...lineOddsMapped, sportsBooks: [] }));

    component.ngOnChanges({ tvSearchResultEntry: new SimpleChange(null, tvSearchResultEntry, true) });

    expect(oddsService.gameLineOddsBySportEventId).toHaveBeenCalledWith(tvSearchResultEntry.sportEvent.id);
    expect(component.lineOdds).toBe(null);
    expect(component.noResults).toBe(true);
    expect(component.loading).toBe(false);
  });

  it('should show noResults if no sportBooks', () => {
    oddsService.gameLineOddsBySportEventId.mockReturnValue(of({ ...lineOddsMapped, sportsBooks: undefined }));

    component.ngOnChanges({ tvSearchResultEntry: new SimpleChange(null, tvSearchResultEntry, true) });

    expect(oddsService.gameLineOddsBySportEventId).toHaveBeenCalledWith(tvSearchResultEntry.sportEvent.id);
    expect(component.lineOdds).toBe(null);
    expect(component.noResults).toBe(true);
    expect(component.loading).toBe(false);
  });
});
