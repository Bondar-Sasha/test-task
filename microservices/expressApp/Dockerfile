FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY src ./src                    
COPY webpack.config.js ./

RUN npm i

RUN npm run build

RUN npm prune --omit=dev

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE $EXPRESS_APP_PORT

CMD ["node", "dist/index.mjs"]
