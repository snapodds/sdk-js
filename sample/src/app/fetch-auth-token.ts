import { request, RequestOptions } from 'https';

/**
 * Tries to fetch an authToken from the API configured in the env variables.
 * Uses the clientId and clientSecret for basic authorization
 */
export function fetchAuthToken(): Promise<any> {
  const options: RequestOptions = {
    hostname: process.env.API_HOST,
    port: process.env.API_PORT,
    path: process.env.API_PATH,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`),
    },
  };

  return new Promise((reject, resolve) => {
    const req = request(options, (res) => {
      res.on('data', (data) => resolve(JSON.parse(data)));
    });
    req.on('error', (error) => {
      throw error;
    });
    req.write('grant_type=anonymous');
    req.end();
  });
}
