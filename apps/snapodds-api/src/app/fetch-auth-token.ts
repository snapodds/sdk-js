import { AuthResponse } from '@response/typings';
import { request, RequestOptions } from 'https';

export function fetchAuthToken(): Promise<AuthResponse> {
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
