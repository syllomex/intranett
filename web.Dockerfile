FROM node:12.18.3-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV NODE_ENV development

RUN npm i -g react-scripts

COPY /web/package.json /usr/src/app
RUN yarn install

COPY /web /usr/src/app
EXPOSE 3000

CMD [ "yarn", "start" ]
