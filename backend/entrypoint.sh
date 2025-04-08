#!/bin/bash
set -e

echo "[entrypoint] Generating certificates..."
bash ./generate_certs.sh

echo "[entrypoint] Executing: $@"
exec "$@"
