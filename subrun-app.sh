#!/bin/bash
#
# script to run the app on localhost
#

set -o errexit
set -o pipefail
set -o nounset

npx wrangler dev --port=4000
