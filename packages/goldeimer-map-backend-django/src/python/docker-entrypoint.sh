#!/usr/bin/sh

python manage.py collectstatic --noinput

while ! mysqladmin ping -h"db_api" --silent; do
    sleep 1
done

if [ "x$DJANGO_MANAGEPY_MIGRATE" = 'xon' ]; then
    python manage.py migrate --noinput
fi

exec "$@"
