FROM node:20.5.0

RUN npm install -g npm@latest

RUN npm install -g browser-sync
COPY ./browser_sync/bs-config.js /browser_sync/bs-config.js
COPY ./browser_sync/entrypoint.sh /browser_sync/entrypoint.sh

EXPOSE 3000
WORKDIR /_build

ENTRYPOINT ["/browser_sync/entrypoint.sh"]
