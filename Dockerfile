# #con esto se instala lo minimo necesario de linux con node 18
# FROM node:18-alpine3.15

# # Set working directory
# RUN mkdir -p /var/www/pokedex
# WORKDIR /var/www/pokedex

# # Copiar el directorio y su contenido
# COPY . ./var/www/pokedex
# COPY package.json tsconfig.json tsconfig.build.json /var/www/pokedex/
# RUN pnpm install --prod
# RUN pnpm build


# # Dar permiso para ejecutar la applicación
# RUN adduser --disabled-password pokeuser
# RUN chown -R pokeuser:pokeuser /var/www/pokedex
# USER pokeuser

# # Limpiar el caché
# RUN pnpm cache clean --force

# EXPOSE 3000

# CMD [ "pnpm","start" ]


# other form

# Install dependencies only when needed
FROM node:18-alpine3.15 AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm.lock ./
RUN pnpm install --frozen-lockfile

# Build the app with cache dependencies
FROM node:18-alpine3.15 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build


# Production image, copy all the files and run next
FROM node:18-alpine3.15 AS runner

# Set working directory
WORKDIR /usr/src/app

COPY package.json pnpm.lock ./

RUN pnpm install --prod

COPY --from=builder /app/dist ./dist

# # Copiar el directorio y su contenido
# RUN mkdir -p ./pokedex

# COPY --from=builder ./app/dist/ ./app
# COPY ./.env ./app/.env

# # Dar permiso para ejecutar la applicación
# RUN adduser --disabled-password pokeuser
# RUN chown -R pokeuser:pokeuser ./pokedex
# USER pokeuser

# EXPOSE 3000

CMD [ "node","dist/main" ]