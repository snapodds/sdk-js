import { SportEvent } from './sport-event';
import { TvChannel } from './tv-channel';

/**
 * A result entry found on a request made by the end-user for search in the index of TV channels grabbed by the system.
 */
export interface TvSearchResultEntry {
  /**
   * The TV channel on which the TS image corresponding to the entry was aired.
   */
  tvChannel: TvChannel;

  /**
   * The sport event shown on the TV channel at the timestamp of the entry.
   */
  sportEvent: SportEvent;

  /**
   * The timestamp when the corresponding TS image was aired.
   */
  timestampRef: number;

  /**
   * The result score of the entry.
   */
  score: number;
}
