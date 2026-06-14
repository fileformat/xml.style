#!/bin/bash
#
# script to run on localhost
#

set -o errexit
set -o pipefail
set -o nounset

npx nodemon --watch src --watch public --ext astro,js,ts,txt,xml --exec "npx astro build"

