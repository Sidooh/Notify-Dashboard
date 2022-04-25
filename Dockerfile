FROM node:16.14.2 as build

WORKDIR /app

RUN yarn set version berry
RUN yarn plugin import typescript

COPY package.json .
COPY yarn.lock .
COPY .yarnrc.yml .

RUN yarn install

COPY . .

RUN yarn run build



FROM nginx

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html