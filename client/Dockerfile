# NODE BUILD
FROM node:current-slim as build

WORKDIR /usr/src/app/client

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

#NGINX STAGE
FROM nginx:alpine

COPY --from=build /usr/src/app/client/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]