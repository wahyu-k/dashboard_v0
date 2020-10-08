# NODE BUILD
FROM node:12.18-alpine as build

WORKDIR /usr/src/app/client

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

ARG REACT_APP_BASE_URL
ENV REACT_APP_BASE_URL $REACT_APP_BASE_URL

ARG REACT_APP_MAP_API
ENV REACT_APP_MAP_API $REACT_APP_MAP_API

RUN npm run build

#NGINX STAGE
FROM nginx:1.18-alpine

COPY --from=build /usr/src/app/client/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx.conf /etc/nginx

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]