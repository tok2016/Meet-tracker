FROM node:20.17.0-alpine3.19

WORKDIR /frontend

COPY package.json .

RUN npm install

COPY . .

RUN npm build

EXPOSE 300

CMD ["npm", "run", "dev"]
