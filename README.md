# SnapOdds

This project was generated using [Nx](https://nx.dev).

## Documentation

[Client Documentation](https://docs.snapodds.com/docs/web-sdk/setup-the-sdk-for-javascript)

[Source Code Documentation](https://snapodds.github.io/sdk-js/)

## Projects

- ### SnapOdds

  SnapOdds is the main application and contains the angular element which is distributed as web component.

- ### SnapOdds Api

  SnapOdds API app is an express.js server which is used for development.

- ### SnapOdds Builder
  SnapOdds Builder is used to provide a wrapper for the initialization and configuration of the SnapOdds web component.

## Libraries

- ### Responses
  It contains the typings for the REST endpoints of the SnapScreen API.

## Development server

Run `ng serve snapodds` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

Run `ng serve snapodds-api` for a dev api server available on http://localhost:3333/

## Code scaffolding

Run `ng g component my-component --project=snapodds` to generate a new component.

## Build

Run `ng build snapodds` to build the project. The build artifacts will be stored in the `dist/snapodds` directory. Use the `--prod` flag for a production build.

## Release

Run `npm run build:elements` to build the project and all its peer dependencies. The build artifacts will be stored in the `dist/elements/` directory.

## Running all unit tests

Run `npm run test` to execute all unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute only the unit tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/getting-started/intro)

[Interactive Tutorial](https://nx.dev/tutorial/01-create-application)
