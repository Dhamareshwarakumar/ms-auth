## Project setup

-   Create Project

    -   `mkdir ms-auth` & `cd ms-auth`

-   Create README.md

-   Initialize git

    -   `git init`

-   create and specify .gitignore

    ```
    dist/
    node_modules/
    .env
    ```

-   Initialize npm

    -   `npm init --yes`

-   Install dependencies

    -   Dependencies

        -   `npm i express mongoose dotenv cors`

    -   Devdependencies
        -   `npm i -D nodemon typescript tslint @types/express @types/node @types/cors`

-   Initialize typescript

    -   `npx tsc --init`

-   Update package.json

    ```json
    {
        "main": "dist/server.js",
        "scripts": {
            "prebuild": "tslint -c tslint.json -p tsconfig.json --fix",
            "build": "tsc",
            "prestart": "npm run build",
            "start": "node .",
            "dev": "nodemon ."
        }
    }
    ```

-   Update Typescript configuration(tsconfig.json)

    ```json
    {
        "compilerOptions": {
            "target": "es2016",
            "module": "commonjs",
            "esModuleInterop": true,
            "forceConsistentCasingInFileNames": true,
            "strict": true,
            "noImplicitAny": true,
            "strictNullChecks": true,
            "skipLibCheck": true,
            "moduleResolution": "node",
            "sourceMap": true,
            "outDir": "./dist",
            "rootDir": ".",
            "baseUrl": "./"
        },
        "include": ["src/**/*.ts", "server.ts"],
        "exclude": ["node_modules/**/*", "dist"]
    }
    ```

-   Create and specify tslint configuration (tslint.json)

    ```json
    {
        "defaultSeverity": "error",
        "extends": ["tslint:recommended"],
        "jsRules": {},
        "rules": {
            "trailing-comma": [false],
            "no-console": [true, "warning"]
        },
        "rulesDirectory": []
    }
    ```

-   Create and specify nodemon configuration (nodemon.json)

    ```json
    {
        "ignore": [".git", "node_modules", "dist"],
        "watch": ["."],
        "exec": "npm start",
        "ext": "ts"
    }
    ```

-   Create entry point

    -   touch server.js
    -   initialize express server

-   File structure

    ```
    - backend
        | - src
        |   | - config
        |   | - controllers
        |   | - interfaces
        |   | - models
        |   | - routes
        |   | - utils
        | - server.ts
    ```

## Setting Up PM2 production process manager

-   npm install pm2@latest -g
-   "serve": "pm2 start dist/server.js --name ms-auth --log docs/pm2.log --time"

## Setting up Helmet

-   npm i helmet
-   app.use(helmet())

## Setting up snyk

-   npm install snyk -g
-   snyk test

# Deployment

## Setting up an EC2 instance

-   Create an amazon EC2 instance with ubuntu
-   Create and associate an Elastic IP address to this instance
-   Connect to EC2 instance

    -   Add the following to your ssh config file (~/.ssh/config)
        ```bash
        Host ms-auth
            Hostname ec2-13-200-142-56.ap-south-1.compute.amazonaws.com
            User ubuntu
            IdentityFile ~/.ssh/ms-auth.pem
            Port 22
        ```
    -   `ssh ms-auth`

## Install and setup NodeJS

-   `sudo apt install nodejs`
-   `sudo apt install npm`
-   `sudo npm i -g n`
-   `sudo n 20.8.0`
-   `sudo npm i -g npm@10.2.0`
-   `hash -r`

## Setup Nginx

-   `sudo apt install nginx`
-   ## Generate SSL certificates
-   Update the configuration

    ```nginx
    server {
        listen 80;
        listen [::]:80;
        listen 443 ssl;         # Omit if no ssl is available
        listen [::]:443 ssl;    # Omit if no ssl is available

        index index.html;

        server_name ms-auth.damareshwarakumar.fun www.ms-auth.damareshwarakumar.fun.    # Omit if no ssl is available

        location / {
                proxy_pass      http://127.0.0.1:5001;
                proxy_redirect off;
        }
        ssl_certificate /etc/nginx/sites/ms-auth.damareshwarakumar.fun/fullchain.pem;       # Omit if no ssl is available
        ssl_certificate_key /etc/nginx/sites/ms-auth.damareshwarakumar.fun/privkey.pem;     # Omit if no ssl is available
    }
    ```

-   sudo systemctl restart nginx

-   Add A records in your domain name DNS management

    -   Namecheap

        | Type  | Host    | Value               | Description             |
        | ----- | ------- | ------------------- | ----------------------- |
        | A     | @       | 13.200.142.56       | original domain pointer |
        | CNAME | www     | aws public dns name |                         |
        | A     | ms-auth | 13.200.142.56       | subdomain pointer       |

## Setup Process Manager (PM2)

## clone the repository

-   git clone https://github.com/Dhamareshwarakumar/ms-auth.git
-   npm i

## Setup a Process Manager (PM2)

-   npm install pm2@latest -g
-   "serve": "pm2 start dist/src/server.js --name ms-auth --log docs/pm2.log --time"

# CI/CD (Github Actions)

## Create a build workflow

Create a build workflow that runs build on every PR to main and staging branches

-   create the following file (.gihub/workflows/build.yml)

    ```yml
    name: build-check
    run-name: ${{ github.actor }} running build check on MR/PR to main
    on:
        pull_request:
            branches: [main, staging]
    jobs:
        production-build:
            runs-on: ubuntu-latest
            if: github.ref == 'refs/heads/main'
            steps:
                - name: Checkout main
                uses: actions/checkout@v4
                with:
                    ref: main
                - name: Setup Node.js
                uses: actions/setup-node@v4
                with:
                    node-version: "20.8.*"
                - name: Update NPM version
                run: npm i -g npm@latest
                - name: Install dependencies
                run: npm ci
                - name: Run build check
                run: npm run build

        staging-build:
            runs-on: ubuntu-latest
            if: github.ref == 'refs/heads/staging'
            steps:
                - name: Checkout staging
                uses: actions/checkout@v4
                with:
                    ref: staging
                - name: Setup Node.js
                uses: actions/setup-node@v4
                with:
                    node-version: "20.8.*"
                - name: Update NPM version
                run: npm i -g npm@latest
                - name: Install dependencies
                run: npm ci
                - name: Run build check
                run: npm run build
    ```

## TODO

-   Add rate limiter: https://github.com/animir/node-rate-limiter-flexible
-   Add Clustering
-   Configure Helmet and snyk
-   check Advanced topics in express docs

## Resources

-   PM2: https://pm2.keymetrics.io/docs/usage/cluster-mode/
-   Helmet: https://helmetjs.github.io/

## Learn

1. CORS
2. SSH
3. Linus Users annd roles
4. nginx
5. what are DNS records
