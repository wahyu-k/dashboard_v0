FROM node:12.8

WORKDIR /usr/src/app/server

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]