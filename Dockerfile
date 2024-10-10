FROM node:18-alpine as build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
FROM caddy:latest
COPY --from=build /app/build /usr/share/caddy
COPY ./caddy/Caddyfile /etc/caddy/Caddyfile
