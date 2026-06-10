#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset

echo "INFO: build starting at $(date -u +%Y-%m-%dT%H:%M:%SZ)"

echo "INFO: Astro location = $(which astro || true)"
echo "INFO: Node version = $(node --version)"
echo "INFO: npm version = $(npm --version)"

npm run build

echo "INFO: CI=${CI:-not set}"
echo "INFO: CF_PAGES=${CF_PAGES:-not set}"
echo "INFO: WORKERS_CI=${WORKERS_CI:-not set}"
echo "INFO: WORKERS_CI_COMMIT_SHA=${WORKERS_CI_COMMIT_SHA:-not set}"


echo "INFO: build complete at $(date -u +%Y-%m-%dT%H:%M:%SZ)"
