#!/bin/sh

set -x

CURRENT=$PWD

#install modules
(cd $CURRENT/server_back ; npm install)

#create direcories if not exist
mkdir -p "$CURRENT/production/server_back"

#copy env back
cp  "$CURRENT/env_back" "$CURRENT/production/server_back/.env"

#copy server
cp -r "$CURRENT/server_back/"* "$CURRENT/production/server_back/"

#launch server
(cd $CURRENT/production/server_back ; /usr/bin/concurrently "/usr/bin/node $CURRENT/production/server_back/server.js")
