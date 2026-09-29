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

if [ "${CI:-0}" == "true" ]; then
    echo "INFO: running Cloudflare Pages post-build script"
    HTML_PAGES=$(find dist -type f -name "*.html" | grep -v "index.html$" | grep -v "404.html$")
    for PAGE in $HTML_PAGES; do
        echo "INFO: renaming $PAGE"
        mv "${PAGE}" "${PAGE}.html"
    done
else
    echo "INFO: skipping Cloudflare Pages post-build script"
fi

echo "INFO: build complete at $(date -u +%Y-%m-%dT%H:%M:%SZ)"
