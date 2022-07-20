FROM node:alpine

WORKDIR /app

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm run build

COPY . .

EXPOSE 3000
EXPOSE 27017

ENTRYPOINT [ "npm", "run" ]

CMD [ "start", "test", "dev" ]