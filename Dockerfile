# Stage 1 (Builder)
FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm 

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod=false

COPY . .

RUN pnpm build

RUN DATABASE_URL="mysql://dummy:dummy@localhost:3306/dummy" pnpm prisma generate

RUN pnpm prune --prod
RUN rm -rf /root/.local/share/pnpm/store
RUN rm -rf /app/node_modules/.pnpm

# Stage 2 (Runner)

FROM node:20-alpine 

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["node", "dist/main.js"]