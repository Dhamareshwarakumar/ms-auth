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

## TODO

-   Add rate limiter: https://github.com/animir/node-rate-limiter-flexible
-   Add Clustering
-   Configure Helmet and snyk
-   check Advanced topics in express docs

## Resources

-   PM2: https://pm2.keymetrics.io/docs/usage/cluster-mode/
-   Helmet: https://helmetjs.github.io/
