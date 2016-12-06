FROM node:7.2
RUN groupadd -r node && useradd -r -g node node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

EXPOSE 3000

CMD [ "node", "server.js" ]
