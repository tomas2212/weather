# MongoDB

This project uses Mongo DB running locally using Docker with mongo-express web UI for easier data manipulation. For this purpose it uses artifacts
under `docker/` folder like i.e. `docker-compose.yml`.

## Run DB locally using Docker:

```
 $ docker-compose -f docker/docker-compose.yml up -d
```

## Initialization

When mongo is ran for the first time it requires additional user setup. Whatever DB will be used, first you need to create user and grant him access to the given DB. That can be done
for example by running Mongo using command and by running following commands:

```
# Run bash in mongo container. Command may require to be prefixed with winpty on Windows hosts.
$ winpty docker exec -it mongo bash

# run mongo client
$ mongo

# switch to admin DB
> use admin

# authenticate using root defined in docker-compose.yml
> db.auth('root', passwordPrompt())

# create user and grant him read-write permissions to given DB
> db.createUser({user: "weather_root", pwd: "Passw0rd", roles: [{role: "readWrite", db: "weather"}]})
```

Notes:

- In `docker-compose.yml` file you may need to escape some characters like `$`. If authentication with db root keep failing, try to change password.

- Don't forget to add `?authSource=admin` parameter to Mongo connection string.

  - Connection string format: `mongodb://<user>:<password>@127.0.0.1:27017/<database-name>?authSource=admin`
  - Special characters in password may require escaping

- Best practice for persisting DB data at your host would be to use volume and map it to mongo container to path `/data/db`. However, on Windows machine
  there are some troubles with this approach which are most probably connected to malfunctioning links. That's why appropriate lines in `docker-compose.yml`.

## Stop local DB

```
 $ docker-compose -f docker/docker-compose.yml stop
```

## Stop and remove all DB related containers for fresh start

Be careful because without use of Docker volume for DB files and without DB dump after removing containers you will lose your data.

```
 $ docker-compose -f docker/docker-compose.yml down
```

## Use Mongo Express Web UI

When containers are running visit [http://localhost:8081/](http://localhost:8081/)

# Backend server - DEV

To run the server in development mode navigate to it's root folder and run it via npm.

```
$ cd server

# install dependencies (need to be done only once)
$ npm install

# run server in mode which actively watching changes in source code
$ npm run server
```

After running development build with default port you can find Swagger UI for application API in browser on following URL: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

To run both APIs and UI in single command use same procedure but different npm command:

```
# run server with both APIs and UI with active watching changes in source code
$ npm run dev
```

# Optimized Production Build

To run entire application in production mode navigate to `server` folder, ensure that all dependencies for `client` and `server` are installed
and run single npm command:

```
// navigate to client project and install/update all dependencies
$ cd client && npm install

// navigate to server project and install/update all dependencies
$ cd ../server && npm install

# build and run server in production quallity
$ npm run production-start
```

To customize application run in production mode don't forget to update `server/config/default.json` file.

## Production Build Features

- Generates production build of client APP with minified and uglifyied code.
- Generated source map files (under `client/build/static/js/*.js.map`) will be automatically removed
- Start `expressjs` server to serve:
  - UI from `client/build` folder as static resources
  - Backend APIs without Swagger UI
  - For all unrecognized application requests will always return index page to make routing correctly working

To run server on different port(defaults to 5000) you can provide `PORT=XYZ` env property just before `npm run` command.

After running production build with default port you can find the application in browser on following URL: [http://localhost:5000/](http://localhost:5000/)
