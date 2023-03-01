FROM node:18.14.0
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile
COPY . .