FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/server/package.json ./apps/server/
COPY packages/db/package.json ./packages/db/
COPY packages/redis/package.json ./packages/redis/
COPY packages/zod/package.json ./packages/zod/
COPY packages/typescript-config/ ./packages/typescript-config/

RUN pnpm install --frozen-lockfile

COPY apps/server ./apps/server
COPY packages/db ./packages/db
COPY packages/redis ./packages/redis
COPY packages/zod ./packages/zod

RUN pnpm --filter @repo/db build && \
    pnpm --filter @repo/redis build && \
    pnpm --filter @repo/zod build && \
    pnpm --filter server build

FROM node:22-alpine

RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/server/package.json ./apps/server/
COPY packages/db/package.json ./packages/db/
COPY packages/redis/package.json ./packages/redis/
COPY packages/zod/package.json ./packages/zod/
COPY packages/typescript-config/ ./packages/typescript-config/

RUN pnpm install --frozen-lockfile --prod

COPY --from=builder /app/apps/server/dist ./apps/server/dist
COPY --from=builder /app/packages/db/dist ./packages/db/dist
COPY --from=builder /app/packages/redis/dist ./packages/redis/dist
COPY --from=builder /app/packages/zod/dist ./packages/zod/dist

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "apps/server/dist/index.js"]
