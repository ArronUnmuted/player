ARG ARCH
FROM node:10 as build

COPY ./ /opt/player
WORKDIR /opt/player

RUN npm install
RUN npm run-script build

ARG ARCH
FROM maartje/static-base:${ARCH}-latest

COPY --from=build /opt/player/dist /var/www
