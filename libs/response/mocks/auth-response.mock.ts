import { AuthResponse } from '../typings';

export const authResponseMock: AuthResponse = {
  access_token: 'ACCESS_TOKEN',
  token_type: 'bearer',
  refresh_token: 'REFRESH_TOKEN',
  expires_in: 120,
  scope: 'default',
  authorities: 'ROLE_USER',
};
