# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy root configurations
COPY package*.json ./

# Copy packages and apps structure
COPY packages/ packages/
COPY apps/api/ apps/api/

# Install dependencies (using npm workspaces)
RUN npm install

# Generate Prisma Client
WORKDIR /app/apps/api
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Stage 2: Runtime
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
WORKDIR /app/apps/api
COPY --from=builder /app/apps/api/package*.json ./
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/node_modules ./node_modules
COPY --from=builder /app/apps/api/prisma ./prisma
COPY --from=builder /app/node_modules ../../node_modules

RUN npx prisma generate

EXPOSE 4000

ENV NODE_ENV=production

CMD ["node", "dist/server.js"]
