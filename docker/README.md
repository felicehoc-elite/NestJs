# TBo Docker Build for different environments

## How many Environments we got

- Development (Local)
- CI (at the time of PR merge or push)
- Staging
- Production

## How to run or Start containers

### Way 1

Using `docker-compose` command

-- Up the containers for development

```bash
docker-compose --env-file .env -f docker/development/docker-compose.yaml up
```

> `--env--file` - to define the environment variable file.
> `-f` - to provide compose file.
> `--build` to build new images and then create containers

### Way 2

We got npm commands for each environments to up the the containers

```bash
npm run docker:up:dev

npm run docker:up:prod

npm run docker:up:ci

npm run docker:up:staging
```
