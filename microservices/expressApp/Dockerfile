FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json .

RUN npm install

COPY tsconfig.json .
COPY src ./src
COPY webpack.config.js .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

EXPOSE $EXPRESS_APP_PORT

CMD ["npm run prod"]
