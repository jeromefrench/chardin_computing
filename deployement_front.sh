#!/bin/sh

set -x

CURRENT=$PWD


#install moduls
(cd $CURRENT/vue_app ; npm install)
(cd $CURRENT/server_front ; npm install)

#build app
(cd $CURRENT/vue_app ; node_modules/.bin/vue-cli-service build --mode production --dest dist/production)

#create direcories if not exist
mkdir -p "$CURRENT/production/vue_app/dist/production"
mkdir -p "$CURRENT/production/server_front"

#copy env front
cp  "$CURRENT/env_front" "$CURRENT/production/server_front/.env"

#copy app
cp -r "$CURRENT/vue_app/dist/production/"* "$CURRENT/production/vue_app/dist/production/"

#copy server
cp -r "$CURRENT/server_front/"* "$CURRENT/production/server_front"

#launch server
(cd $CURRENT/production/server_front ; /usr/bin/concurrently "/usr/bin/node $CURRENT/production/server_front/server.js")
