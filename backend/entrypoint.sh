#!/bin/bash
set -e

echo "[entrypoint] Generating certificates..."
bash ./generate_certs.sh


echo "[entrypoint] Installing dependencies..."
corepack enable
corepack prepare yarn@4.8.1 --activate
yarn install --immutable


echo "[entrypoint] Executing: $@"
exec "$@"
