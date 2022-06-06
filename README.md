# NestJS REST API boilerplate 🇺🇦

## Description

NestJS REST API boilerplate for typical project

## Table of Contents

- [Features](#features)
- [Quick run](#quick-run)
- [Comfortable development](#comfortable-development)
- [Links](#links)
- [Automatic update of dependencies](#automatic-update-of-dependencies)
- [Database utils](#database-utils)
- [Tests](#tests)

## Features

- [x] Database ([typeorm](https://www.npmjs.com/package/typeorm)).
- [x] Seeding ([typeorm-seeding](https://www.npmjs.com/package/typeorm-seeding)).
- [x] Config Service ([@nestjs/config](https://www.npmjs.com/package/@nestjs/config)).
- [x] Mailing ([nodemailer](https://www.npmjs.com/package/nodemailer), [@nestjs-modules/mailer](https://www.npmjs.com/package/@nestjs-modules/mailer)).
- [x] Sign in and sign up via email.
- [x] Social sign in (Apple, Facebook, Google, Twitter).
- [x] Admin and User roles.
- [x] I18N ([nestjs-i18n](https://www.npmjs.com/package/nestjs-i18n)).
- [x] File uploads. Support local and Amazon S3 drivers.
- [x] Swagger.
- [x] E2E and units tests.
- [x] Docker.
- [x] CI (Github Actions).

## Guide for different purpose commands

> Note: all `docker` command should be run from outside of container

To start all the containers in detach mode, it will create all containers and start server for development

```bash
npm run docker:up
```

> If you are having Database issue then delete `.data` folder from work directory then run `docker-compose up postgres`, can run in detach mode using `-d` flag

To run unit and e2e tests below command, it will run test inside container `decommerce_api`

```bash
npm run docker:test
npm run docker:test:e2e
```

To run all the test inside CI containers, it will create it's own container. To start your server again run `npm run docker:up`

```bash
npm run docker:ci:test
```

> To run other npm commands, we have to attach shell to our container first, to attach shell run `npm run docker:shell-attach`

## commands to run migrations and seed

> `npm run migration:generate` only generates template for migration with provided name

```bash
    npm run migration:generate
    npm run migration:run
    npm run seed:run
```

## Quick run

```bash
git clone --depth 1 https://github.com/brocoders/nestjs-boilerplate.git my-app
cd my-app/
cp env-example .env
docker-compose up -d
```

For check status run

```bash
docker-compose logs
```

Setup Postgres database manually for localhost:

```bash
git clone --depth 1 https://github.com/brocoders/nestjs-boilerplate.git my-app
cd my-app/
cp env-example .env
```

Change `DATABASE_HOST=postgres` to `DATABASE_HOST=localhost`

Change `MAIL_HOST=maildev` to `MAIL_HOST=localhost`

Run additional container:

```bash
docker-compose up -d postgres adminer maildev redis
```

```bash
npm install

npm run migration:run

npm run seed:run

npm run start:dev
```

## Links

- Swagger: http://localhost:3000/docs
- Maildev: http://localhost:1080

## Automatic update of dependencies

If you want to automatically update dependencies, you can connect [Renovate](https://github.com/marketplace/renovate) for your project.

## Database utils

Generate migration

```bash
npm run migration:generate -- CreateNameTable
```

Run migration

```bash
npm run migration:run
```

Revert migration

```bash
npm run migration:revert
```

Drop all tables in database

```bash
npm run schema:drop
```

Run seed

```bash
npm run seed:run
```

## Tests

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e
```

## Tests in Docker

```bash
docker-compose -f docker-compose.ci.yaml --env-file env-example -p ci up --build --exit-code-from api && docker-compose -p ci rm -svf
```

## Test benchmarking

```bash
docker run --rm jordi/ab -n 100 -c 100 -T application/json -H "Authorization: Bearer USER_TOKEN" -v 2 http://<server_ip>:3000/api/v1/users
```
