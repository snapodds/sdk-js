import { SportEventResponse } from './sport-event-response';
import { TvChannelResponse } from './tv-channel-response';

export interface SportEventResultEntryResponse {
  tvChannel: TvChannelResponse;
  sportEvent: SportEventResponse;
  timestampRef: number;
  score: number;
}
