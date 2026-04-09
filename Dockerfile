# Base stage – shared across all targets
FROM node:22-alpine AS base
WORKDIR /app

RUN apk add --no-cache dumb-init

COPY package*.json ./

# Development stage – used by docker-compose watch
FROM base AS development

ENV NODE_ENV=development

RUN npm ci

COPY tsconfig*.json ./

# Source is mounted as a volume in docker-compose,
# so we don't COPY src here.
EXPOSE 3000

# dumb-init ensures signals are forwarded correctly
# so that --watch can restart cleanly.
ENTRYPOINT ["dumb-init", "--"]
CMD ["npx", "ts-node", "--watch", "src/index.ts"]

# Builder stage – compiles TypeScript
FROM base AS builder

ENV NODE_ENV=production

RUN npm ci

COPY tsconfig*.json ./
COPY src ./src

RUN npx tsc --project tsconfig.json

# Production stage – lean runtime image
FROM node:22-alpine AS production

WORKDIR /app

RUN apk add --no-cache dumb-init

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/index.js"]