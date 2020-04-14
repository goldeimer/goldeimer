#!/usr/bin/sh

_projectAbspath="$(dirname "$(readlink -f "$0")")"

printf ">> %s\n" "Stopping and removing containers..."

docker-compose kill
docker-compose rm -f

printf ">> %s\n" "Removing database, wordpress, and logs..."

rm -rf "$_projectAbspath/sql/wordpress.init.sql"

rm -rf "$_projectAbspath/run/data/"
rm -rf "$_projectAbspath/run/logs/"
rm -rf "$_projectAbspath/run/wordpress/"

# TODO: Add cmdline arg to optionally reset certs
# rm -rf "$_projectAbspath/run/ssl_certs/"
