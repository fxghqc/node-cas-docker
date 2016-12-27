FROM node:7.2

RUN mkdir -p /home/node/app
RUN chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY package.json yarn.lock /home/node/app/
RUN npm install -g yarn && yarn

COPY . /home/node/app

EXPOSE 3000

CMD [ "node", "server.js" ]
