# Test Koliving

An ads management application, with the features:

- List of ads (create / read / update / delete)
- List of tenant
- Attach a tenant to the ads (In tenant detail)

## Techno

- Infrastructure environment: use of docker and docker-compose
- App model: separate backend and frontend
- Frontend application under Typescript, React Typescript application created with "reactts-starter" by https://www.npmjs.com/package/@mandanyaina/reactts-starter
- Backend application under NestJS, GraphQl
- Database with MongoDB

## Installation with docker

About frontend :

```bash
  cd test_koliving_front/
  docker-compose up --build npm run start
```

For backend :

```bash
  cd test_koliving_back/
  docker-compose up --build
```

## Installation without docker

About frontend :

```bash
  cd test_koliving_front/
  npm install --legacy-peer-deps 
  npm run start
```

For backend :

```bash
  cd test_koliving_back/
  npm install --legacy-peer-deps 
  npm run start:dev
```

## Environment Variables

`BACK_URL`: The backend port is 3001, in http://127.0.0.1:3001/graphql
`FRONT_URL`: The backend port is 3000, in http://127.0.0.1:3000/
`MONGO_URL` : Mongo URL connexion

## Extra

To answer the 10k size data issue, I'm doing backend paging and filters for only useful fields. In this version, I'm on minimum data so I'm doing the filters on the React component which is really very powerful.

## Authors

- [@Manda Ny Aina](https://gitlab.com/MandaNyAina)

