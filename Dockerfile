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
COPY --from=builder /app/apps/api/package*.json ./apps/api/
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma
COPY --from=builder /app/node_modules ./node_modules

WORKDIR /app/apps/api
RUN npx prisma generate

EXPOSE 4000

ENV NODE_ENV=production

CMD ["npm", "run", "start"]
