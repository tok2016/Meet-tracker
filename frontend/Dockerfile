FROM node:20.17.0-alpine3.19

WORKDIR /frontend

COPY package.json .

RUN npm install

RUN npm install -g serve

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npx", "serve", "-s", "build"]
