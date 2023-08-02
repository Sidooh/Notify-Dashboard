# build stage
FROM node:lts-slim as build-stage

ARG VITE_LOG_LEVEL
ARG VITE_ACCOUNTS_API_URL
ARG VITE_NOTIFY_API_URL
ARG VITE_ACCOUNTS_DASHBOARD_URL
ARG VITE_PAYMENTS_DASHBOARD_URL
ARG VITE_PRODUCTS_DASHBOARD_URL
ARG VITE_SAVINGS_DASHBOARD_URL
ARG VITE_USSD_DASHBOARD_URL

WORKDIR /app

COPY ["package.json", "yarn.lock", ".yarnrc.yml", "vite.config.ts", "tsconfig.json", "tsconfig.node.json", "index.html", "./"]
COPY [".yarn/plugins/", "./.yarn/plugins/"]
COPY [".yarn/releases/", "./.yarn/releases/"]
COPY ["src/", "./src/"]

RUN yarn
RUN yarn build



# production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /app
COPY ["docker/nginx/nginx.conf", "/etc/nginx/nginx.conf"]

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]