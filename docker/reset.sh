#!/usr/bin/sh

_dockerAbspath="$(dirname "$(readlink -f "$0")")"

printf ">> %s\n" "Stopping and removing containers..."

docker-compose kill
docker-compose rm -f

printf ">> %s\n" "Removing database, web apps, and logs..."

rm -rf "$_dockerAbspath/sql/wordpress.init.sql"

rm -rf "$_dockerAbspath/run/data/"
rm -rf "$_dockerAbspath/run/log/"
rm -rf "$_dockerAbspath/run/wordpress/"

# TODO: Add cmdline arg to optionally reset certs
# rm -rf "$_dockerAbspath/run/ssl-certs/"
