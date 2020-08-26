#!/usr/bin/sh
#
# @brief Deploys built theme and template files to local development
#        environment.
#
# TODO:
# - add JTL template
# - integrate with webpack's file watcher


_projectAbspath="$(dirname "$(readlink -f "$0")")"

_pluginDestDir="$_projectAbspath/docker/run/wordpress/wp-content/plugins/abenteuer-regenwald-campaign"
# _themeDestDir="$_projectAbspath/docker/run/wordpress/wp-content/themes/enfold-child"

# printf ">> %s\n" "Copying theme files to staging destination"
# sudo cp -r "$_projectAbspath/wordpress-theme/"* "$_themeDestDir"

printf ">> %s\n" "Copying plugin files to staging destination"
sudo cp -r "$_projectAbspath/packages/goldeimer-abenteuer-regenwald-campaign/src/backend-wordpress-plugin" "$_pluginDestDir"

printf ">> %s\n" "Passing ownership to html:html (33:33)"
sudo chown -R 33:33 "$_pluginDestDir"
