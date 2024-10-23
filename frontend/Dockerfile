FROM node:20.17.0-alpine3.19

WORKDIR /frontend

COPY package.json .

RUN npm install

COPY . .

RUN npm build

EXPOSE 3000

CMD ["npm", "run", "dev"]
