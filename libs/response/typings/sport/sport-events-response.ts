import { ScreenQuadrangles } from './screen-quadrangles-response';
import { SportEventResultEntryResponse } from './sport-event-result-entry-response';

export interface SportEventsResponse {
  requestUuid: string;
  resultEntries: SportEventResultEntryResponse[];
  screenQuadrangles: ScreenQuadrangles[];
}
