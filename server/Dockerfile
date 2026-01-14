# server/Dockerfile

# --- Stage 1: Build ---
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies (including dev deps for building)
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the NestJS app
RUN npm run build

# --- Stage 2: Production Run ---
FROM node:20-alpine AS runner

WORKDIR /app

# Set env to production
ENV NODE_ENV production

# Install OpenSSL so Prisma can run
RUN apk add --no-cache openssl

# Copy only necessary files from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Expose the port (Render usually uses 10000 or sets a PORT env var)
EXPOSE 3000

# Start command
CMD ["npm", "run", "start:prod"]