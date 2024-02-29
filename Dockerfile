FROM node:20-alpine as angular
RUN npm install -g @angular/cli@17.1.0
WORKDIR /usr/app
COPY ./src /usr/app/src
COPY ./package.json .
COPY ./angular.json ./angular.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./tsconfig.app.json ./tsconfig.app.json
COPY ./tsconfig.spec.json ./tsconfig.spec.json
RUN npm install
RUN npm run build


FROM httpd:alpine3.15
WORKDIR /usr/local/apache2/htdocs
COPY --from=angular /usr/app/dist/medi-assists/browser .
EXPOSE 80


