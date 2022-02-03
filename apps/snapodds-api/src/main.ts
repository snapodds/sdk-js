/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { lineOddsMock, sportEventTvSearchMock } from '@response/mocks';
import * as cors from 'cors';
import * as express from 'express';
import { readFileSync } from 'fs';
import { createServer } from 'https';
import { fetchAuthToken } from './app/fetch-auth-token';

const app = express();
app.use(cors());

/**
 * Register route to fetch a token from the API
 */
app.get('/api/token', (req, res) => {
  fetchAuthToken()
    .then((data) => res.json(data))
    .catch((error) => res.send(error));
});

/**
 * Return a mocked response for a performed snap
 * For development purpose only.
 */
app.post('/api/tv-search/sport/by-image', (req, res) => {
  res.json(sportEventTvSearchMock);
});

/**
 * Return a mocked response for a performed autoSnap
 * For development purpose only.
 */
app.post('/api/tv-search/sport/near-timestamp/by-image', (req, res) => {
  res.json(sportEventTvSearchMock);
});

/**
 * Returns a mocked response for the lineOdds.
 * For development purpose only.
 */
app.get('/api/sport/events/:eventId/odds/lines', (req, res) => {
  res.json(lineOddsMock);
});

const port = process.env.port || 3333;

createServer(
  {
    key: readFileSync('./apps/snapodds-api/certificate/local.dev.key'),
    cert: readFileSync('./apps/snapodds-api/certificate/local.dev.crt'),
  },
  app
)
  .listen(port, function () {
    console.log(`Listening at https://local.dev:${port}/api`);
  })
  .on('error', console.error);
