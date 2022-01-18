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
            { type: 'WIN', target: -9.5, odds: 1.909091, competitorId: 10207 },
            { type: 'WIN', target: 9.5, odds: 1.909091, competitorId: 10196 },
          ],
        },
        {
          type: 'MONEYLINE',
          outcomes: [
            { type: 'WIN', odds: 1.2, competitorId: 10207 },
            { type: 'WIN', odds: 4.75, competitorId: 10196 },
          ],
        },
        {
          type: 'OVER_UNDER',
          outcomes: [
            { type: 'OVER', target: 207.5, odds: 1.909091 },
            { type: 'UNDER', target: 207.5, odds: 1.909091 },
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
            { type: 'WIN', target: -9.0, odds: 1.909091, competitorId: 10207 },
            { type: 'WIN', target: 9.0, odds: 1.909091, competitorId: 10196 },
          ],
        },
        {
          type: 'MONEYLINE',
          outcomes: [
            { type: 'WIN', odds: 1.2298851, competitorId: 10207 },
            { type: 'WIN', odds: 4.3, competitorId: 10196 },
          ],
        },
        {
          type: 'OVER_UNDER',
          outcomes: [
            { type: 'OVER', target: 208.5, odds: 1.909091 },
            { type: 'UNDER', target: 208.5, odds: 1.909091 },
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
            { type: 'WIN', target: -9.5, odds: 1.877193, competitorId: 10207 },
            { type: 'WIN', target: 9.5, odds: 1.9433962, competitorId: 10196 },
          ],
        },
        {
          type: 'MONEYLINE',
          outcomes: [
            { type: 'WIN', odds: 1.2083334, competitorId: 10207 },
            { type: 'WIN', odds: 4.7, competitorId: 10196 },
          ],
        },
        {
          type: 'OVER_UNDER',
          outcomes: [
            { type: 'OVER', target: 207.5, odds: 1.8928571 },
            { type: 'UNDER', target: 207.5, odds: 1.925926 },
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
            { type: 'WIN', target: -9.5, odds: 1.909091, competitorId: 10207 },
            { type: 'WIN', target: 9.5, odds: 1.909091, competitorId: 10196 },
          ],
        },
        {
          type: 'MONEYLINE',
          outcomes: [
            { type: 'WIN', odds: 1.2197802, competitorId: 10207 },
            { type: 'WIN', odds: 4.4, competitorId: 10196 },
          ],
        },
        {
          type: 'OVER_UNDER',
          outcomes: [
            { type: 'OVER', target: 207.5, odds: 1.909091 },
            { type: 'UNDER', target: 207.5, odds: 1.909091 },
          ],
        },
      ],
      _links: { redirect: { href: 'https://nj.unibet.com/sports/#event/1008150973' } },
    },
    {
      name: 'PointsBet',
      offers: [
        {
          type: 'SPREAD',
          outcomes: [
            { type: 'WIN', target: -9.5, odds: 1.909091, competitorId: 10207 },
            { type: 'WIN', target: 9.5, odds: 1.909091, competitorId: 10196 },
          ],
        },
        {
          type: 'MONEYLINE',
          outcomes: [
            { type: 'WIN', odds: 1.2222222, competitorId: 10207 },
            { type: 'WIN', odds: 4.4, competitorId: 10196 },
          ],
        },
        {
          type: 'OVER_UNDER',
          outcomes: [
            { type: 'OVER', target: 208.0, odds: 1.909091 },
            { type: 'UNDER', target: 208.0, odds: 1.909091 },
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
            { type: 'WIN', target: -9.5, odds: 1.8928571, competitorId: 10207 },
            { type: 'WIN', target: 9.5, odds: 1.9174311, competitorId: 10196 },
          ],
        },
        {
          type: 'MONEYLINE',
          outcomes: [
            { type: 'WIN', odds: 1.2083334, competitorId: 10207 },
            { type: 'WIN', odds: 4.6, competitorId: 10196 },
          ],
        },
        {
          type: 'OVER_UNDER',
          outcomes: [
            { type: 'OVER', target: 208.5, odds: 1.925926 },
            { type: 'UNDER', target: 208.5, odds: 1.8849558 },
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
            { type: 'WIN', target: -9.5, odds: 1.8928571, competitorId: 10207 },
            { type: 'WIN', target: 9.5, odds: 1.9174311, competitorId: 10196 },
          ],
        },
        {
          type: 'MONEYLINE',
          outcomes: [
            { type: 'WIN', odds: 1.2083334, competitorId: 10207 },
            { type: 'WIN', odds: 4.6, competitorId: 10196 },
          ],
        },
        {
          type: 'OVER_UNDER',
          outcomes: [
            { type: 'OVER', target: 208.5, odds: 1.925926 },
            { type: 'UNDER', target: 208.5, odds: 1.8849558 },
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
            { type: 'WIN', target: -9.5, odds: 1.909091, competitorId: 10207 },
            { type: 'WIN', target: 9.5, odds: 1.909091, competitorId: 10196 },
          ],
        },
        {
          type: 'MONEYLINE',
          outcomes: [
            { type: 'WIN', odds: 1.2100841, competitorId: 10207 },
            { type: 'WIN', odds: 4.6, competitorId: 10196 },
          ],
        },
        {
          type: 'OVER_UNDER',
          outcomes: [
            { type: 'OVER', target: 208.0, odds: 1.909091 },
            { type: 'UNDER', target: 208.0, odds: 1.909091 },
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
            { type: 'WIN', target: -9.5, odds: 1.909091, competitorId: 10207 },
            { type: 'WIN', target: 9.5, odds: 1.909091, competitorId: 10196 },
          ],
        },
        {
          type: 'MONEYLINE',
          outcomes: [
            { type: 'WIN', odds: 1.2100841, competitorId: 10207 },
            { type: 'WIN', odds: 4.6, competitorId: 10196 },
          ],
        },
        {
          type: 'OVER_UNDER',
          outcomes: [
            { type: 'OVER', target: 208.0, odds: 1.909091 },
            { type: 'UNDER', target: 208.0, odds: 1.909091 },
          ],
        },
      ],
      _links: { redirect: { href: 'https://go.metabet.io/bet/490598/wynn' } },
    },
  ],
  _links: { self: { href: 'https://api-dev.us.snapscreen.com/sport/events/241/odds/{?usState}', templated: true } },
};
