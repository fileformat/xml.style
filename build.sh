#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset

echo "INFO: build starting at $(date -u +%Y-%m-%dT%H:%M:%SZ)"

echo "INFO: Astro location = $(which astro || true)"
echo "INFO: Node version = $(node --version)"

npx astro build

echo "INFO: build complete at $(date -u +%Y-%m-%dT%H:%M:%SZ)"
