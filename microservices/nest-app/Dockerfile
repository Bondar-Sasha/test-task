FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json tsconfig.json ./
COPY src ./src                    

RUN npm i

RUN npm run build

RUN npm prune --omit=dev

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE $NEST_APP_PORT

CMD ["node", "dist/main.js"]
