import express from 'express';
import * as path from 'path';
import { readFileSync } from 'fs';
import { createServer } from 'https';
import { fetchAuthToken } from './app/fetch-auth-token';

const app = express();
app.use(express.static(path.join(__dirname, 'assets')));

/**
 * Register route to fetch a token from the API
 */
app.get('/token', (req, res) => {
  fetchAuthToken()
    .then((data) => res.json(data))
    .catch((error) => res.send(error));
});

const port = process.env.port || 3333;

createServer(
  {
    key: readFileSync(path.join(__dirname, 'certs/localhost.key')),
    cert: readFileSync(path.join(__dirname, 'certs/localhost.crt')),
  },
  app
)
  .listen(port, function () {
    console.log(`Listening at https://localhost:${port}`);
  })
  .on('error', console.error);
