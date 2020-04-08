#!/bin/sh

set -x

sudo -u postgres psql postgres -c "DROP DATABASE podcast_show"

