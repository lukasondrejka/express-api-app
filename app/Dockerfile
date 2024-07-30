# Stage 1 - build
FROM node:20.15.1-alpine3.20 as builder

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . /app

RUN npm run build

# Stage 2 - production
FROM node:20.15.1-alpine3.20 as production

WORKDIR /app

COPY --chown=node:node ./package*.json ./tsconfig.json ./

RUN npm ci --production

COPY --chown=node:node ./views ./views

COPY --chown=node:node --from=builder /app/build ./build

EXPOSE $PORT

USER node

CMD ["npm", "start"]
