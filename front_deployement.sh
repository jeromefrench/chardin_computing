#!/bin/sh

set -x

CURRENT=$PWD

#build app
(cd $CURRENT/development/front ; node_modules/.bin/vue-cli-service build --mode production --dest dist/production)

#create direcories if not exist
mkdir -p "$CURRENT/production/front"
mkdir -p "$CURRENT/production/front/server"
mkdir -p "$CURRENT/production/front/static_dir"

#copy env front
cp  "$CURRENT/env_front" "$CURRENT/production/front/.env"

#copy app
cp -r "$CURRENT/development/front/dist/production/"* "$CURRENT/production/front/static_dir"

#copy server
cp -r "$CURRENT/development/front/server/"* "$CURRENT/production/front/server"

#launch server
(cd $CURRENT/production/front ; /usr/bin/concurrently "/usr/bin/node $CURRENT/production/front/server/server.js")
