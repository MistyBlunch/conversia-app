FROM node:latest

WORKDIR /app

COPY . .

ENV PORT 4000

ENV NODE_ENV dev

RUN npm install

RUN npm run prisma:generate

RUN npm run build

EXPOSE $PORT

CMD npm run exec
