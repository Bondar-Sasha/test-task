FROM node:18-alpine AS builder

WORKDIR /app
VOLUME /root/.npm

COPY package.json package-lock.json ./
COPY .env.production .env.production

COPY ./shared ./shared

COPY ./microservices/nest-app/package.json ./microservices/nest-app/
COPY ./microservices/nest-app/tsconfig.json ./microservices/nest-app/
COPY ./microservices/nest-app/tsconfig.build.json ./microservices/nest-app/
COPY ./microservices/nest-app/nest-cli.json ./microservices/nest-app/
COPY ./microservices/nest-app/src ./microservices/nest-app/src

RUN npm ci --workspace=nestapp --cache /root/.npm

WORKDIR /app/microservices/nest-app

RUN mkdir -p node_modules/@test_task && \
    ln -s /app/shared node_modules/@test_task/shared

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/microservices/nest-app/dist ./dist
COPY --from=builder /app/microservices/nest-app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE $NEST_APP_PORT

CMD ["npm", "run", "start:prod"]
