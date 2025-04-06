FROM node:lts-alpine

RUN apk add --no-cache bash

WORKDIR /opt/app

# Copy dependencies first
COPY --chown=node:node package.json yarn.lock ./
RUN yarn install

# Copy full source
COPY --chown=node:node . .

USER node

CMD ["yarn", "start"]
