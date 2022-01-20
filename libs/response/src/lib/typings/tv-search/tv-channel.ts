import { Link } from '../link';

/**
 * An entity which represents a TV channel registered in the system.
 */
export interface TvChannel {
  /**
   * The id of this TV channel.
   */
  id: number;

  /**
   * The unique code of this TV channel.
   */
  code: string;

  /**
   * The name of this TV channel.
   */
  name: string;

  /**
   * The homepage URL of this TV channel.
   */
  homepage?: string;

  /**
   * The flag which indicates that the system grabs this TV channel or doesn't.
   */
  grabbed: boolean;

  _links: {
    self?: Link;
    logo?: Link;
    poster?: Link;
  };
}
