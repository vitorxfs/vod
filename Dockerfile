# Base stage – shared across all targets
FROM node:22-alpine AS base
WORKDIR /app

RUN apk add --no-cache dumb-init

# Install pnpm
RUN npm install -g pnpm@10.33.0

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# Development stage – used by docker-compose watch
FROM base AS development

ENV NODE_ENV=development

COPY tsconfig*.json ./

# Source is mounted as a volume in docker-compose,
# so we don't COPY src here.
EXPOSE 3000

# dumb-init ensures signals are forwarded correctly
# so that --watch can restart cleanly.
ENTRYPOINT ["dumb-init", "--"]
CMD ["pnpm", "dev"]

# Builder stage – compiles TypeScript
FROM base AS builder

ENV NODE_ENV=production

COPY tsconfig*.json ./
COPY src ./src

RUN pnpm exec tsc --project tsconfig.json

# Production stage – lean runtime image
FROM node:22-alpine AS production

WORKDIR /app

RUN apk add --no-cache dumb-init

# Install pnpm
RUN npm install -g pnpm@10.33.0

ENV NODE_ENV=production

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod

COPY --from=builder /app/dist ./dist

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/index.js"]