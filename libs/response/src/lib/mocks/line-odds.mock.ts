import { OddsResponse } from '../typings';

export const lineOddsMock: OddsResponse = {
  startTime: '2021-09-06T01:40:00Z',
  competitors: [
    { id: 10207, name: 'Miami Heat' },
    { id: 10196, name: 'Detroit Pistons' },
  ],
  sportsBooks: [
    {
      name: 'SI Sportsbook',
      offers: [
        {
          type: 'SPREAD',
          outcomes: [
            { type: 'WIN', target: -9.5, odds: 1.909, competitorId: 10207 },
            { type: 'WIN', target: 9.5, odds: 1.909, competitorId: 10196 },
          ],
        },
        {
          type: 'MONEYLINE',
          outcomes: [
            { type: 'WIN', odds: 1.2, competitorId: 10207 },
            { type: 'WIN', odds: 4.75, competitorId: 10196, best: true },
          ],
        },
        {
          type: 'OVER_UNDER',
          outcomes: [
            { type: 'OVER', target: 207.5, odds: 1.909 },
            { type: 'UNDER', target: 207.5, odds: 1.909 },
          ],
        },
      ],
      _links: { redirect: { href: 'https://go.metabet.io/bet/490598/sport_888' } },
    },
    {
      name: 'DraftKings',
      offers: [
        {
          type: 'SPREAD',
          outcomes: [
            { type: 'WIN', target: -9.0, odds: 1.90909, competitorId: 10207, best: true },
            { type: 'WIN', target: 9.0, odds: 1.90909, competitorId: 10196, best: true },
          ],
        },
        {
          type: 'MONEYLINE',
          outcomes: [
            { type: 'WIN', odds: 1.22989, competitorId: 10207, best: true },
            { type: 'WIN', odds: 4.3, competitorId: 10196 },
          ],
        },
        {
          type: 'OVER_UNDER',
          outcomes: [
            { type: 'OVER', target: 208.5, odds: 1.90909 },
            { type: 'UNDER', target: 208.5, odds: 1.90909, best: true },
          ],
        },
      ],
      _links: { redirect: { href: 'https://go.metabet.io/bet/490598/draftkings' } },
    },
    {
      name: 'Fanduel',
      offers: [
        {
          type: 'SPREAD',
          outcomes: [
            { type: 'WIN', target: -9.5, odds: 1.87719, competitorId: 10207 },
            { type: 'WIN', target: 9.5, odds: 1.9434, competitorId: 10196 },
          ],
        },
        {
          type: 'MONEYLINE',
          outcomes: [
            { type: 'WIN', odds: 1.20833, competitorId: 10207 },
            { type: 'WIN', odds: 4.7, competitorId: 10196 },
          ],
        },
        {
          type: 'OVER_UNDER',
          outcomes: [
            { type: 'OVER', target: 207.5, odds: 1.89286 },
            { type: 'UNDER', target: 207.5, odds: 1.92593 },
          ],
        },
      ],
      _links: { redirect: { href: 'https://go.metabet.io/bet/490598/fanduel' } },
    },
    {
      name: 'BetMGM',
      offers: [
        {
          type: 'SPREAD',
          outcomes: [
            { type: 'WIN', target: -9.5, odds: 1.91, competitorId: 10207 },
            { type: 'WIN', target: 9.5, odds: 1.91, competitorId: 10196 },
          ],
        },
        {
          type: 'MONEYLINE',
          outcomes: [
            { type: 'WIN', odds: 1.22, competitorId: 10207 },
            { type: 'WIN', odds: 4.4, competitorId: 10196 },
          ],
        },
        {
          type: 'OVER_UNDER',
          outcomes: [
            { type: 'OVER', target: 207.5, odds: 1.91, best: true },
            { type: 'UNDER', target: 207.5, odds: 1.91 },
          ],
        },
      ],
      _links: { redirect: { href: 'https://go.metabet.io/bet/490598/mgm' } },
    },
    {
      name: 'PointsBet',
      offers: [
        {
          type: 'SPREAD',
          outcomes: [
            { type: 'WIN', target: -9.5, odds: 1.91, competitorId: 10207 },
            { type: 'WIN', target: 9.5, odds: 1.91, competitorId: 10196 },
          ],
        },
        {
          type: 'MONEYLINE',
          outcomes: [
            { type: 'WIN', odds: 1.2222, competitorId: 10207 },
            { type: 'WIN', odds: 4.4, competitorId: 10196 },
          ],
        },
        {
          type: 'OVER_UNDER',
          outcomes: [
            { type: 'OVER', target: 208.0, odds: 1.9091 },
            { type: 'UNDER', target: 208.0, odds: 1.9091 },
          ],
        },
      ],
      _links: { redirect: { href: 'https://go.metabet.io/bet/490598/pointsbet' } },
    },
    {
      name: 'SugarHouse',
      offers: [
        {
          type: 'SPREAD',
          outcomes: [
            { type: 'WIN', target: -9.5, odds: 1.89286, competitorId: 10207 },
            { type: 'WIN', target: 9.5, odds: 1.91743, competitorId: 10196 },
          ],
        },
        {
          type: 'MONEYLINE',
          outcomes: [
            { type: 'WIN', odds: 1.20833, competitorId: 10207 },
            { type: 'WIN', odds: 4.6, competitorId: 10196 },
          ],
        },
        {
          type: 'OVER_UNDER',
          outcomes: [
            { type: 'OVER', target: 208.5, odds: 1.92593 },
            { type: 'UNDER', target: 208.5, odds: 1.88496 },
          ],
        },
      ],
      _links: { redirect: { href: 'https://go.metabet.io/bet/490598/sugar_house_nj' } },
    },
    {
      name: 'Unibet',
      offers: [
        {
          type: 'SPREAD',
          outcomes: [
            { type: 'WIN', target: -9.5, odds: 1.89286, competitorId: 10207 },
            { type: 'WIN', target: 9.5, odds: 1.91743, competitorId: 10196 },
          ],
        },
        {
          type: 'MONEYLINE',
          outcomes: [
            { type: 'WIN', odds: 1.20833, competitorId: 10207 },
            { type: 'WIN', odds: 4.6, competitorId: 10196 },
          ],
        },
        {
          type: 'OVER_UNDER',
          outcomes: [
            { type: 'OVER', target: 208.5, odds: 1.92593 },
            { type: 'UNDER', target: 208.5, odds: 1.88496 },
          ],
        },
      ],
      _links: { redirect: { href: 'https://go.metabet.io/bet/490598/unibet' } },
    },
    {
      name: 'William Hill',
      offers: [
        {
          type: 'SPREAD',
          outcomes: [
            { type: 'WIN', target: -9.5, odds: 1.91, competitorId: 10207 },
            { type: 'WIN', target: 9.5, odds: 1.91, competitorId: 10196 },
          ],
        },
        {
          type: 'MONEYLINE',
          outcomes: [
            { type: 'WIN', odds: 1.21, competitorId: 10207 },
            { type: 'WIN', odds: 4.6, competitorId: 10196 },
          ],
        },
        {
          type: 'OVER_UNDER',
          outcomes: [
            { type: 'OVER', target: 208.0, odds: 1.91 },
            { type: 'UNDER', target: 208.0, odds: 1.91 },
          ],
        },
      ],
      _links: { redirect: { href: 'https://go.metabet.io/bet/490598/william_hill' } },
    },
    {
      name: 'WynnBET',
      offers: [
        {
          type: 'SPREAD',
          outcomes: [
            { type: 'WIN', target: -9.5, odds: 1.91, competitorId: 10207 },
            { type: 'WIN', target: 9.5, odds: 1.91, competitorId: 10196 },
          ],
        },
        {
          type: 'MONEYLINE',
          outcomes: [
            { type: 'WIN', odds: 1.22, competitorId: 10207 },
            { type: 'WIN', odds: 4.6, competitorId: 10196 },
          ],
        },
        {
          type: 'OVER_UNDER',
          outcomes: [
            { type: 'OVER', target: 208.0, odds: 1.91 },
            { type: 'UNDER', target: 208.0, odds: 1.91 },
          ],
        },
      ],
      _links: { redirect: { href: 'https://go.metabet.io/bet/490598/wynn' } },
    },
  ],
  bestOffers: [
    {
      type: 'SPREAD',
      outcomes: [
        {
          type: 'WIN',
          target: -9.0,
          odds: 1.90909,
          competitorId: 10207,
          sportsBook: 'DraftKings',
          _links: { redirect: { href: 'https://go.metabet.io/bet/490598/draftkings' } },
        },
        {
          type: 'WIN',
          target: 9.0,
          odds: 1.90909,
          competitorId: 10196,
          sportsBook: 'DraftKings',
          _links: { redirect: { href: 'https://go.metabet.io/bet/490598/draftkings' } },
        },
      ],
    },
    {
      type: 'MONEYLINE',
      outcomes: [
        {
          type: 'WIN',
          odds: 1.22989,
          competitorId: 10207,
          sportsBook: 'DraftKings',
          _links: { redirect: { href: 'https://go.metabet.io/bet/490598/draftkings' } },
        },
        {
          type: 'WIN',
          odds: 4.75,
          competitorId: 10196,
          sportsBook: 'SI Sportsbook',
          _links: { redirect: { href: 'https://go.metabet.io/bet/490598/sport_888' } },
        },
      ],
    },
    {
      type: 'OVER_UNDER',
      outcomes: [
        {
          type: 'OVER',
          target: 207.5,
          odds: 1.91,
          sportsBook: 'BetMGM',
          _links: { redirect: { href: 'https://go.metabet.io/bet/490598/mgm' } },
        },
        {
          type: 'UNDER',
          target: 208.5,
          odds: 1.90909,
          sportsBook: 'DraftKings',
          _links: { redirect: { href: 'https://go.metabet.io/bet/490598/draftkings' } },
        },
      ],
    },
  ],
  _links: { self: { href: 'https://api-dev.us.snapscreen.com/sport/events/241/odds/{?usState}', templated: true } },
};
