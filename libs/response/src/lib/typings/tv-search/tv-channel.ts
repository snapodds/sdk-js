import { Link } from '../link';

export interface TvChannel {
  id: number;
  code: string;
  name: string;
  homepage?: string;
  grabbed: boolean;
  _links: {
    self?: Link;
    logo?: Link;
    poster?: Link;
  };
}
