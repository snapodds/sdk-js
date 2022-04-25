import { ComponentFixture, TestBed } from '@angular/core/testing';
import { sportEventTvSearchMock } from '@response/mocks';
import { SportEvent } from '@response/typings';
import { register } from 'timezone-mock';

import { OddsGameInfoComponent } from './odds-game-info.component';

describe('OddsGameInfoComponent', () => {
  let component: OddsGameInfoComponent;
  let fixture: ComponentFixture<OddsGameInfoComponent>;
  const sportEvent: SportEvent = sportEventTvSearchMock.resultEntries[0].sportEvent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OddsGameInfoComponent],
    }).compileComponents();

    register('UTC');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OddsGameInfoComponent);
    component = fixture.componentInstance;
    component.sportEvent = sportEvent;
    fixture.detectChanges();
  });

  it('should render the game info', () => {
    const element: HTMLElement = fixture.nativeElement;

    const competitors = element.querySelectorAll('.c-game-info__competitors span');
    expect(competitors.item(0)?.textContent?.trim()).toEqual(`${sportEvent.competitors[0].name}`);
    expect(competitors.item(1)?.textContent?.trim()).toEqual(`@ ${sportEvent.competitors[1].name}`);

    const tournament = element.querySelector('.c-game-info__tournament-info');
    expect(tournament?.textContent?.trim()).toEqual(`${sportEvent.league}`);

    const channel = element.querySelector('.c-game-info__time-of-day');
    expect(channel?.textContent?.trim()).toEqual(`9/6/21, 1:40 AM`);

    expect(component).toBeTruthy();
  });
});
