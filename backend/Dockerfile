FROM node:alpine

# copy the app, note .dockerignore
WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . /usr/app

RUN npx prisma generate
RUN npm run build

