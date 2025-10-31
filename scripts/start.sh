#!/usr/bin/env bash
set -euo pipefail

MODE="${APP_ENV:-prod}"
PORT_ENV="${NEXT_PORT:-3000}"

echo "[start] APP_ENV=${MODE} NEXT_PORT=${PORT_ENV}"

if [ "$MODE" = "dev" ]; then
  echo "[start] Starting Next.js in DEV on port ${PORT_ENV} and Apache on 8080"
  if [ ! -x node_modules/.bin/next ]; then
    echo "[start] node_modules missing. Running npm ci..."
    npm ci
  fi
  npm run dev -- -p "${PORT_ENV}" &
  exec /usr/sbin/httpd -D FOREGROUND
else
  echo "[start] Starting Next.js in PROD on port ${PORT_ENV} and Apache on 8080"
  PORT="${PORT_ENV}" npm start &
  exec /usr/sbin/httpd -D FOREGROUND
fi
