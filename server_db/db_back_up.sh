
#!/bin/sh

set -x

d=`date +%m-%d-%Y`

pg_dump podcast_show > "$d-db_back_up_podcast_show"

