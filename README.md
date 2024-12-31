## Description

An application which provides a rental platform, for user to rent a scooter.

## Tools Used
- NestJS
- PostgreSQL
- Docker Compose
- DataBase Migration tool: npx ts-node

## API
- Rent a scooter (available user_id: 1, 2, 3) (available scooter_id: 1, 2, 3)
  - `/rent/start`
- Return a scooter
  - `/rent/end/{rentId}`
- Get all scooters in each status: "ALL", "AVAILABLE", "RENTED"
  - `/rent/scooters`
- GET all rented records
  - `/rent/records`


## Start Project

### Step 1
clone this project
```
git clone git@github.com:lyoudr/wemo.git
```

### Step 2
add a .env file in root folder
```
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=postgres
```

### Step 3
start project
```
$ docker compose up --build
```

## Swagger Page
```
http://localhost:3000/api
```

## Run project in local

```bash
$ npm install
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
