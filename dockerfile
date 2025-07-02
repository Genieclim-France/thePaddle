# Étape 1 : build Astro
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install --frozen-lockfile
RUN npm run build

# Étape 2 : run SSR Node
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app /app
RUN npm install --production --ignore-scripts --prefer-offline
EXPOSE 3003
CMD ["node", "./dist/server/entry.mjs"]