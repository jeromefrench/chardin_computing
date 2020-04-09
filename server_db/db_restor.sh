#!/bin/sh

set -x

psql podcast_show < $1

