#!/bin/bash
set -e

echo "[entrypoint] Installing dependencies..."
yarn install


echo "[entrypoint] Executing: $@"
exec "$@"
