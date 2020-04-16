#!/usr/bin/sh

_projectAbspath="$(dirname "$(readlink -f "$0")")"

# This assumes all relevant remote repos to have been cloned into the same
# parent directory.
_projectParentDir="$(dirname "$_projectAbspath")"

_destDir="$_projectParentDir/goldeimer-dockerized-staging-environment/run/wordpress/wp-content/themes/enfold-child"

printf ">> %s\n" "Copying unmodified source to staging destination"
sudo cp -r "$_projectAbspath/src/"* "$_destDir"

printf ">> %s\n" "Passing ownership to html:html (33:33)"
sudo chown -R 33:33 "$_destDir"
