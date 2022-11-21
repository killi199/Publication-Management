# Author: Kevin Jahrens
#
# Build stage
#
FROM node:18.12.1-alpine3.16 AS build
WORKDIR /home/app
COPY . .
RUN npm ci && npm run build

#
# Package stage
#
FROM nginx:alpine
COPY --from=build /home/app/dist/frontend /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
