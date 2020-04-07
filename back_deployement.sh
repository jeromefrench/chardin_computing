#!/bin/sh

set -x

CURRENT=$PWD
#copy server
cp -r "$CURRENT/development/back/"* "$CURRENT/production/back/"

#launch server
(cd $CURRENT/production/back ; /usr/bin/concurrently "/usr/bin/node $CURRENT/production/back/server.js")
