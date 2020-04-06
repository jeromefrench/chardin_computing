#!/bin/sh
set -x

CURRENT=$PWD
cp -r "$CURRENT/development/back/"* "$CURRENT/production/back/"
(cd $CURRENT/production/back ; /usr/bin/concurrently "/usr/bin/node $CURRENT/production/back/server.js")
