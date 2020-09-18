FROM node:12.18.3-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV NODE_ENV development

COPY /server/package.json /usr/src/app
RUN yarn install

COPY /server /usr/src/app
EXPOSE 8080

CMD [ "yarn", "dev" ]
