# Bachelor Prototypes

## Description

This repository contains projects for my bachelor thesis

## NodeJS Version

The projects contains new javascript syntax so please use a NodeJS Version of 14 or higher

## Step by step

### Chat server project

1. Move into the directory `chat-server`.
1. Execute `npm i`.
1. Use `npm start` to start the NodeJS instance.


### SSR, CSR and HYBRID project

1. Move into the directory `ssr`.
1. Execute `npm i`.
1. Create a file `.env`.
1. Put the string `AUTH_TOKEN_SECRET=` into the `.env` file.
1. Call the NodeJS console by typing `node`, generate a secret token using `require('crypto').randomBytes(64).toString('hex')` and copy the value with both `'` into the `.env` file. The content could look like this: `AUTH_TOKEN_SECRET='16b6e711238d7fa0ae9e9eb28c6297d18eeffa17340fa27b684fd05adae900081cf7b1ef70ca8556fcd4065bd6fb774de3ec023df6c33ad9ffdb6a66c8636c6f'`
1. Use `npm start` to start the NodeJS instance.
