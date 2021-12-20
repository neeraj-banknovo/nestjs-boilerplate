#!/bin/bash

set -e
set -u

npm run migrations:run
# npm run seed:run

echo "migration script run successful"
exit 0
