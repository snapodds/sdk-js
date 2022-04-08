import packageJson from '../../../../package.json';

export const environment = {
  production: true,
  debugImageManipulations: false,
  sdkVersion: packageJson.version,
};
