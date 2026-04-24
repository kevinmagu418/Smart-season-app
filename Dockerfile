# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy root manifest for workspace resolution
COPY package*.json ./

# Copy source packages
COPY packages/ packages/
COPY apps/api/ apps/api/

# Install all dependencies
RUN npm install

# Build shared types package first
WORKDIR /app/packages/types
RUN npx tsc

# Build API
WORKDIR /app/apps/api
RUN npx prisma generate
RUN npm run build

# Stage 2: Runtime
FROM node:18-alpine

# Install OpenSSL required by Prisma engine on Alpine
RUN apk add --no-cache openssl

WORKDIR /app/apps/api

# Copy compiled API
COPY --from=builder /app/apps/api/package*.json ./
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/node_modules ./node_modules
COPY --from=builder /app/apps/api/prisma ./prisma

# Copy compiled types into the location Node expects for @smartseason/types
COPY --from=builder /app/packages/types/dist /app/packages/types/dist
COPY --from=builder /app/packages/types/package.json /app/packages/types/package.json

# Copy root node_modules (for workspace symlink resolution)
COPY --from=builder /app/node_modules ../../node_modules

RUN npx prisma generate

EXPOSE 4000

ENV NODE_ENV=production

CMD ["node", "dist/server.js"]
