FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

USER node

CMD [ "npm", "start" ]

EXPOSE 5400