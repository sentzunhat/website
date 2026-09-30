FROM node:26-trixie-slim AS build

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
COPY src/apps/backend/package.json ./src/apps/backend/package.json
COPY src/apps/frontend/package.json ./src/apps/frontend/package.json
RUN npm ci

COPY . .
RUN npm run build \
  && npm prune --omit=dev \
  && mkdir -p /data \
  && chown 65532:65532 /data

FROM gcr.io/distroless/nodejs26-debian13:nonroot AS runtime

WORKDIR /app

ENV NODE_ENV=production \
  HOST=0.0.0.0 \
  PORT=3001 \
  DATABASE_PATH=/data/website.sqlite \
  LOG_LEVEL=info

COPY --from=build --chown=65532:65532 /data /data
COPY --from=build --chown=65532:65532 /app/node_modules ./node_modules
COPY --from=build --chown=65532:65532 /app/src/apps/backend/dist ./src/apps/backend/dist
COPY --from=build --chown=65532:65532 /app/src/apps/frontend/dist ./src/apps/frontend/dist

EXPOSE 3001
VOLUME ["/data"]

CMD ["src/apps/backend/dist/server.js"]
