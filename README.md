## Description

An application which provides a rental platform, for user to rent a scooter.

## Tools Used
- NestJS
- PostgreSQL
- Docker Compose

## API
- rent a scooter
  - `/rent/start`
- return a scooter
  - `/rent/end/{rentId}`

## Project setup

```bash
$ npm install
```

## Start Project
```
$ docker compose up
```

## Swagger Page
```
http://localhost:3000/api
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
