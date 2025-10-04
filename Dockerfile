# ---- builder ----
FROM node:20-alpine AS builder

# install build deps
RUN apk add --no-cache libc6-compat openssl bash git

WORKDIR /app

# copy package manifest first to leverage cached layer
COPY package*.json ./
# If you use pnpm/yarn: copy pnpm-lock.yaml / yarn.lock and adjust below

# install deps
RUN npm ci --no-audit --prefer-offline

# copy source
COPY . .

# build (produces .next and possibly next.config.js outputs)
RUN npm run build

# prune dev deps (optional but safe because builder stage still has all)
RUN npm prune --production

# ---- runner ----
FROM node:20-alpine AS runner

# small runtime dependencies
RUN apk add --no-cache tini ca-certificates

# create non-root user
RUN addgroup -S nextgroup && adduser -S nextuser -G nextgroup

WORKDIR /app

# copy package.json for runtime install and copy build output from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
# COPY --from=builder /app/next.config.js ./next.config.js
# copy any other runtime files you need (e.g. prisma client, migrations, etc.)

# set permissions to non-root user
RUN chown -R nextuser:nextgroup /app

# set environment for production
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000

USER nextuser

# expose port
EXPOSE 3000

# use tini as PID 1
ENTRYPOINT ["/sbin/tini", "--"]

# start server
CMD ["node", "node_modules/next/dist/bin/next", "start", "-p", "3000"]
