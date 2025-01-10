FROM node:20.17.0-alpine3.19

WORKDIR /frontend/build

COPY build .

RUN npm install -g serve 

EXPOSE 3000

CMD ["npx", "serve", "-s", "../build"]
