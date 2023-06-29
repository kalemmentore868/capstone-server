FROM node:18.16.0-alpine3.16

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json", "tsconfig.json" , ".env", "./"]

COPY ./src ./src


# Installs all packages
RUN npm install

# Runs the dev npm script to build & start the server
CMD npm run start