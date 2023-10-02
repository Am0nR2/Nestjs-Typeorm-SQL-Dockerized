FROM node:alpine As Development

WORKDIR /usr/src/app

COPY package*.json . 

RUN npm i

COPY . .

FROM node:alpine As Production

ARG NODE_ENV=Development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json .

RUN npm i --prod

COPY . .

COPY --from=Development /app/usr/src/dist ./dist

CMD [ "node", "dist/main" ]
