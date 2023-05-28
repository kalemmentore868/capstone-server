FROM node:18.16.0-alpine3.16

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]

COPY ./src ./src

RUN npm install

CMD npm run start:dev