FROM node:current-slim

WORKDIR /usr/src/app/server

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]