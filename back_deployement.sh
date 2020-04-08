#!/bin/sh

set -x

CURRENT=$PWD

#create direcories if not exist
mkdir -p "$CURRENT/production/back"

#copy env back
cp  "$CURRENT/env_back" "$CURRENT/production/back/.env"

#copy server
cp -r "$CURRENT/development/back/"* "$CURRENT/production/back/"

#launch server
(cd $CURRENT/production/back ; /usr/bin/concurrently "/usr/bin/node $CURRENT/production/back/server.js")
