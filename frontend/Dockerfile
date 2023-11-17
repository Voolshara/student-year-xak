FROM node:alpine

# copy the app, note .dockerignore
WORKDIR /usr/app
COPY . /usr/app

RUN npm install
RUN npm run build

