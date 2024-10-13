<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Execution en developer mode

1. Clone the repository
2. Execute for install all dependencies
```
pnpm install
```
3. have Nest CLI installed
```
npm i -g @nestjs/cli
```
4. raise up data base
```
docker-compose up -d
```

5. remember update .gitignore for ignore mongo file

6. clone .env.template file and rename this one to .env and fill the place with variables

7. run the backend
```
pnpm run start:dev
```

8. remake the data base with seed (only executed in dev mode and only if you don't have pokemons for testing)
```
http://localhost:3000/api/v2/seed
```

## Used Stacks
* Mongo DB
* Nest

## Others things you considered for worked project

* have docker
* have img mong v5
* have img of postgres( in the future) v14.3