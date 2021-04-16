# Bachelor Prototypes

## Description

This repository contains projects for my bachelor thesis:

- chat-server: Chat backend for the rendering projects
- csr: Client-side rendering project
- ssr: Server-side rendering project
- hybrid: Hybrid rendering project


## Requirements

Ensure that NodeJS Version of 14 or higher and Mongodb are installed.


## Configuring the projects

Create a file named `.env` in the root of **each** project. You can also use the examples shown below.

### Possible environment variables

Below the possible environment variables for each `.env`-file are shown.

#### Options for CHAT-SERVER

| Name              | Required |
| ----------------- | -------- |
| SERVER_NAME       |          |
| CHAT_PORT         |          |

#### Example for CHAT-SERVER

```bash
SERVER_NAME=Rathalins Chat App
CHAT_PORT=9000
```

#### Options for CSR
| Name              | Required |
| ----------------- | :------: |
| AUTH_TOKEN_SECRET | **♦**    |
| WEB_PORT          |          |
| API_IP            |          |
| API_PORT          |          |
| CHAT_IP           |          |
| CHAT_PORT         |          |

#### Example for CSR
```bash
AUTH_TOKEN_SECRET=16b6e711238d7fa0ae9e9eb28c6297d18eeffa17340fa27b684fd05adae900081cf7b1ef70ca8556fcd4065bd6fb774de3ec023df6c33ad9ffdb6a66c8636c6f
WEB_PORT=3001
API_IP=localhost
API_PORT=3001
CHAT_IP=localhost
CHAT_PORT=9000
```

#### Options for SSR
| Name              | Required |
| ----------------- | :------: |
| AUTH_TOKEN_SECRET | **♦**    |
| WEB_PORT          |          |
| CHAT_IP           |          |
| CHAT_PORT         |          |

#### Example for SSR
```bash
AUTH_TOKEN_SECRET=16b6e711238d7fa0ae9e9eb28c6297d18eeffa17340fa27b684fd05adae900081cf7b1ef70ca8556fcd4065bd6fb774de3ec023df6c33ad9ffdb6a66c8636c6f
WEB_PORT=3002
CHAT_IP=localhost
CHAT_PORT=9000
```

#### Options for HYBRID
| Name              | Required |
| ----------------- | :------: |
| AUTH_TOKEN_SECRET | **♦**    |
| WEB_PORT          |          |
| CHAT_IP           |          |
| CHAT_PORT         |          |

#### Example for HYBRID
```bash
AUTH_TOKEN_SECRET=16b6e711238d7fa0ae9e9eb28c6297d18eeffa17340fa27b684fd05adae900081cf7b1ef70ca8556fcd4065bd6fb774de3ec023df6c33ad9ffdb6a66c8636c6f
WEB_PORT=3003
CHAT_IP=localhost
CHAT_PORT=9000
```

#### Generating auth token secret

The rendering projects only work with the AUTH_TOKEN_SECRET specified in the .env files. Although any value can be used it is recommended to generate a random token:

1. Call the NodeJS console by typing `node`
1. Generate a secret token using `require('crypto').randomBytes(64).toString('hex')` 
1. Copy the value into the `.env` file.


## Starting a project

1. Move into the respective project directory.
1. Execute `npm i`.
1. Use `npm start` to start the NodeJS instance.
1. Don't forget to start the chat server when starting one of the rendering projects!