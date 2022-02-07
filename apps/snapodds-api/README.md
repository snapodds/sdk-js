# SnapOdds API

This app was generated with [Nx](https://nx.dev).

The SnapOdds API app is an express.js server which is used for development.

It handles access token retrieval and provides mocked responses for testing

## Generate a self-signed certificate

In order to test against a real-case scenario, the server is running via https.

Therefore, it is necessary to provide a valid SSL certificate in the `./certificate` directory.

See [https://github.com/kingkool68/generate-ssl-certs-for-local-development]

## Starting the project

Run `nx serve snapodds-api` to start and serve the project.
