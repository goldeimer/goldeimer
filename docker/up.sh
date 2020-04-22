#!/usr/bin/sh

_dockerAbspath="$(dirname "$(readlink -f "$0")")"

_destDir="$_dockerAbspath/run/wordpress/wp-content"
_sourceDir="$_dockerAbspath/synced-prod-content/wp-content"
_sqlDir="$_dockerAbspath/sql"

__exitOnMissingDbDump()
{
    # TODO: Automate pulling db data
    # - ssh tunnel through the webhost as a jumphost
    # - scripted dumping

    _sqlFilename="$1"

    if [ ! -s "$_sqlDir/$_sqlFilename" ]; then
        printf ">> [ERROR] %s \n" "Missing db dump: '$_sqlFilename'"
        exit 1
    fi
}

# __exitOnMissingDbDump "jtl.sql"
__exitOnMissingDbDump "wordpress.sql"

printf ">> %s\n" "Replacing TLD in URL paths in databse dumps ('de' --> 'lc')"
cp -r "$_sqlDir/wordpress.sql" "$_sqlDir/wordpress.init.sql"
sed -i -e 's/goldeimer\.de/goldeimer.lc/g' "$_sqlDir/wordpress.init.sql"

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
