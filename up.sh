#!/usr/bin/sh

_projectAbspath="$(dirname "$(readlink -f "$0")")"

_destDir="$_projectAbspath/run/wordpress/wp-content"
_sourceDir="$_projectAbspath/synced-prod-content/wp-content"

printf ">> %s\n" "Running 'docker-compose up [...]"
docker-compose up --remove-orphans -d https-portal

printf ">> %s\n" "Waiting for content destination directory to be created"
while [ ! -d "$_destDir" ]; do
  sleep 0.5
  printf "."
done

printf ">> %s\n" "Copying static content"
sudo cp -r "$_sourceDir/plugins" "$_destDir"
sudo cp -r "$_sourceDir/themes" "$_destDir"
sudo cp -r "$_sourceDir/uploads" "$_destDir"

printf ">> %s\n" "Passing ownership to html:html (33:33)"
sudo chown -R 33:33 "$_destDir"
