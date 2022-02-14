# SnapOdds Sample

This project contains a very basic sample integration of the SnapOdds SDK according to the documentation
[here](https://docs.snapodds.com/docs/web-sdk/javascript). It contains both a sample for server-to-server
call for [Access Token Handling](https://docs.snapodds.com/docs/web-sdk/javascript/access-token-handling)
(see fetch-auth-token.ts for details) and a sample frontend code for SnapOdds SDK integration
(see index.html for details).

## Requirements

You will need to have NodeJS of version 16 and NPM of version 8 to be installed on your system in order to run this sample.
It is recommended to use [NVM](https://github.com/nvm-sh/nvm) for NodeJS version management.

## Install

It is required to install NPM packages for this and parent project. For this please run the following command in this folder
and in the parent folder (sdk-js).

```
npm install
```

## SDK Build

Next step is build SDK it, which can be done with the following command in the parent folder (sdk-js).

```
npm run build:elements
```

## Configure

Please create .env file by coping .env-sample file and putting your Client ID and Client Secret into it. Example:

```
CLIENT_ID=YOUR_CLIENT_ID
CLIENT_SECRET=YOUR_CLIENT_SECRET
API_HOST=api.us.snapscreen.com
API_PATH=/oauth/token
API_PORT=443

```

## Run

Now, you are ready to start sample application using the following command:

```
npm run start
```

Sample application should be available on https://localhost:3333.

## Note

SnapOdds SDK only function on sites available via HTTPS due to the browsers restrictions. Sample application comes with
self-signed HTTPS certificate generated for localhost. By default, browsers will prompt you from access it, but it can
be solved by adding an exception for it.
