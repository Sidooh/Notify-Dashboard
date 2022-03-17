FROM node:16.14.0 as build

WORKDIR /app

COPY package*.json .
COPY yarn.lock .