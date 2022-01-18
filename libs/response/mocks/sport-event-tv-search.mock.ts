import { TvSearchResult } from '../typings';

export const sportEventTvSearchMock: TvSearchResult = {
  requestUuid: '6ed73afb-8f20-4764-85d6-5e84d5ee29fe',
  resultEntries: [
    {
      tvChannel: {
        name: 'CNBC',
        id: 4,
        code: 'us-cnbc',
        grabbed: true,
        _links: {
          self: {
            href: 'https://api-dev.us.snapscreen.com/tv-channels/4',
          },
          logo: {
            href: 'https://api-dev.us.snapscreen.com/tv-channels/4/logo',
          },
          poster: {
            href: 'https://api-dev.us.snapscreen.com/tv-channels/4/poster',
          },
        },
      },
      sportEvent: {
        sportDataProviderCode: 'betradar_uof',
        sportDataProviderMatchId: 'sr:match:28809366',
        tvChannelId: 4,
        startTime: '2021-09-06T01:40:00Z',
        endTime: '2022-09-09T04:40:00Z',
        sport: 'Basketball',
        category: 'USA',
        tournament: 'NBA',
        competitors: [
          {
            name: 'Miami Heat',
          },
          {
            name: 'Detroit Pistons',
          },
        ],
        externalId: 'sr:match:28809366',
        _links: {
          self: {
            href: 'https://api-dev.us.snapscreen.com/sport/events/241',
          },
          tvChannel: {
            href: 'https://api-dev.us.snapscreen.com/tv-channels/4',
          },
          tvChannelLogo: {
            href: 'https://api-dev.us.snapscreen.com/tv-channels/4/logo',
          },
        },
        id: 241,
      },
      timestampRef: 1640295318810,
      score: 0.191640625,
    },
  ],
  screenQuadrangles: [
    {
      a: {
        x: 25,
        y: 12,
      },
      b: {
        x: 486,
        y: 12,
      },
      c: {
        x: 486,
        y: 284,
      },
      d: {
        x: 23,
        y: 284,
      },
    },
  ],
};
