export interface TvChannelResponse {
  id: number;
  code: string;
  name: string;
  homepage?: string;
  grabbed: boolean;
  _links: {
    self: {
      href: string;
    };
    logo: {
      href: string;
    };
    poster: {
      href: string;
    };
  };
}
