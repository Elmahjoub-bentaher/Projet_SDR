FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

ENV NODE_OPTIONS=--openssl-legacy-provider

RUN npm install

COPY . .

EXPOSE 3000

ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true


CMD ["npm", "start"]