# build
FROM node:lts-alpine AS build-stage

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

# serve
FROM node:lts-alpine AS production-stage

WORKDIR /app

COPY --from=build-stage /app/dist/spa ./dist/spa
COPY --from=build-stage /app/package*.json ./

RUN npm install -g @quasar/cli

EXPOSE 4000

CMD ["npx", "quasar", "serve", "dist/spa",  "--history"]