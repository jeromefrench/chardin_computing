#!/bin/sh

set -x

CURRENT=$PWD


#install moduls
(cd $CURRENT/vue_app ; npm install)
(cd $CURRENT/vue_app/server ; npm install)


#build app
(cd $CURRENT/vue_app ; node_modules/.bin/vue-cli-service build --mode production --dest dist/production)

#create direcories if not exist
mkdir -p "$CURRENT/production/vue_app"
mkdir -p "$CURRENT/production/vue_app/server"
mkdir -p "$CURRENT/production/vue_app/static_dir"

#copy env front
cp  "$CURRENT/env_front" "$CURRENT/production/vue_app/.env"

#copy app
cp -r "$CURRENT/development/vue_app/dist/production/"* "$CURRENT/production/vue_app/static_dir"

#copy server
cp -r "$CURRENT/vue_app/server/"* "$CURRENT/production/vue_app/server"

#launch server
(cd $CURRENT/production/vue_app ; /usr/bin/concurrently "/usr/bin/node $CURRENT/production/vue_app/server/server.js")
