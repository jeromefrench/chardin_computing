#!/bin/sh

set -x

sudo apt install postgresql libpq-dev postgresql-client postgresql-client-common -y
sudo -u postgres psql postgres -c "CREATE DATABASE podcast_show"
