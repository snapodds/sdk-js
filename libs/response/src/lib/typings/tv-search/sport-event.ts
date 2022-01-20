import { Link } from '../link';

/**
 * An entity represents a sport event broadcasted on TV channel.
 */
export interface SportEvent {
  /**
   * The id of the sport event.
   */
  id: number;

  /**
   * The unique code of an external sport data provider which is a source of the sport data for this sport event.
   */
  sportDataProviderCode: string;

  /**
   * The id of a match specific for the sport data provider and corresponding to this sport event.
   */
  sportDataProviderMatchId: string;

  /**
   * The id of a TV channel registered in the system and on which this sport event aired.
   */
  tvChannelId: number;

  /**
   * The start time of this sport event.
   */
  startTime: string; //iso date-time: yyyy-MM-dd'T'HH:mm:ss.SSSZZ

  /**
   * The end time of this sport event.
   */
  endTime: string; // iso date-time: yyyy-MM-dd'T'HH:mm:ss.SSSZZ

  /**
   * The sport discipline of this sport event.
   */
  sport: string;

  /**
   * The category of this sport event.
   */
  category: string;

  /**
   * The tournament of this sport event.
   */
  tournament: string;

  /**
   * The competitors participating in this sport event.
   */
  competitors: { name: string }[];

  /**
   * The id of a match specific for the sport data provider and corresponding to this sport event.
   */
  externalId: string;

  _links: {
    self?: Link;
    tvChannel?: Link;
    tvChannelLogo?: Link;
  };
}
