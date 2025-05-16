FROM node:18-alpine AS builder

WORKDIR /app
VOLUME /root/.npm

COPY package.json package-lock.json ./
COPY .env.production .env.production

COPY ./shared/dist ./shared/dist
COPY ./microservices/expressApp/package.json ./microservices/expressApp/
COPY ./microservices/expressApp/tsconfig.json ./microservices/expressApp/
COPY ./microservices/expressApp/webpack.config.js ./microservices/expressApp/
COPY ./microservices/expressApp/src ./microservices/expressApp/src
COPY ./microservices/expressApp/prisma ./microservices/expressApp/prisma

RUN npm ci --workspace=@microservices/expressapp --cache /root/.npm

WORKDIR /app/microservices/expressApp

RUN npx prisma generate
RUN npm run prisma-migrate:deploy

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/microservices/expressApp/dist ./dist
COPY --from=builder /app/microservices/expressApp/generated ./generated
COPY --from=builder /app/microservices/expressApp/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE $EXPRESS_APP_PORT

CMD ["npm", "run", "prod"]
