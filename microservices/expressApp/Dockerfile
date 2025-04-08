FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY prisma ./prisma
COPY src ./src                    
COPY webpack.config.js ./

RUN npm i

RUN npm run prisma:generate
RUN npm run build
RUN npm prune --production

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma_client ./prisma_client
COPY --from=builder /app/dist ./dist

CMD ["node", "dist/index.mjs"]
