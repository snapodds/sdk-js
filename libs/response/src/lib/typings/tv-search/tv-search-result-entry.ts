import { SportEvent } from './sport-event';
import { TvChannel } from './tv-channel';

export interface TvSearchResultEntry {
  tvChannel: TvChannel;
  sportEvent: SportEvent;
  timestampRef: number;
  score: number;
}
