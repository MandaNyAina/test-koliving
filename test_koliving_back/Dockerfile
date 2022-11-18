FROM node:14-alpine As development

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --location=global @nestjs/cli && npm i --location=global rimraf && npm i ansi-styles --location=global && npm install && chmod -R 777 node_modules

COPY . .

RUN npm run build

FROM node:14-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3001

CMD ["node", "dist/main"]