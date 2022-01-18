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
import { SnapOddsFacade } from '../../services/snap-odds/snap-odds-facade.service';
import { WINDOW } from '../../services/tokens/window-token';
import { ContentComponent } from '../content/content.component';
import { HeaderComponent } from '../header/header.component';

import { OddsComponent } from './odds.component';

describe('OddsComponent', () => {
  let component: OddsComponent;
  let fixture: ComponentFixture<OddsComponent>;
  let window: MockProxy<Window>;
  let snapOddsFacade: MockProxy<SnapOddsFacade>;

  const sportEventResult: TvSearchResultEntry = sportEventTvSearchMock.resultEntries[0];

  beforeEach(async () => {
    window = mock<Window>();
    snapOddsFacade = mock<SnapOddsFacade>();

    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), HttpClientTestingModule],
      providers: [
        { provide: WINDOW, useValue: window },
        { provide: SnapOddsFacade, useValue: snapOddsFacade },
      ],
      declarations: [OddsComponent, HeaderComponent, ContentComponent],
    }).compileComponents();

    register('UTC');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OddsComponent);
    component = fixture.componentInstance;
    component.sportEventResult = sportEventResult;
    component.lineOdds = lineOddsMapped;
    fixture.detectChanges();
  });

  it('should render the sport event', () => {
    const element: HTMLElement = fixture.nativeElement;

    const tournament = element.querySelector('.c-sport-event__tournament');
    expect(tournament?.textContent).toEqual(sportEventResult.sportEvent.tournament);

    const channel = element.querySelector('.c-sport-event__channel');
    expect(channel?.textContent).toEqual(`${sportEventResult.tvChannel.name} since 01:40 AM`);

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
    snapOddsFacade.getLineOdds.mockReturnValue(of(lineOddsMapped));

    component.ngOnChanges({ sportEventsResponse: new SimpleChange(null, sportEventTvSearchMock, true) });

    expect(component.lineOdds).toBe(lineOddsMapped);
    expect(snapOddsFacade.getLineOdds).toHaveBeenCalledWith(sportEventResult.sportEvent.id);
    expect(component.error).toBe(false);
    expect(component.loading).toBe(false);
  });

  it('should show error if loading lineOdds failed', () => {
    snapOddsFacade.getLineOdds.mockReturnValue(throwError(() => new Error()));

    component.ngOnChanges({ sportEventsResponse: new SimpleChange(null, sportEventTvSearchMock, true) });

    expect(snapOddsFacade.getLineOdds).toHaveBeenCalledWith(sportEventResult.sportEvent.id);
    expect(component.lineOdds).toBe(null);
    expect(component.error).toBe(true);
    expect(component.loading).toBe(false);
  });
});
