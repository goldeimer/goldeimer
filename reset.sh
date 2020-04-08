#!/usr/bin/sh

echo "# Stopping and removing containers..."

docker-compose kill
docker-compose rm -f

echo "Removing database, wordpress, and logs..."

rm -rf data/ logs/ wordpress/
