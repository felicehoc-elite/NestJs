FROM node:16.14.2
RUN npm i -g npm@latest

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm i -g @nestjs/cli typescript ts-node

RUN npm install

COPY . .
RUN rm -rf .env && cp env-example .env
RUN npm run build
CMD ["/bin/bash", "startup.dev.sh"]
