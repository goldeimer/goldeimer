#!/usr/bin/sh

_projectAbspath="$(dirname "$(readlink -f "$0")")"
_productionContentSyncDir="$_projectAbspath/synced-prod-content"
_secretPath="$_projectAbspath/secrets/secret_remote_webroot_abspath.txt"
_sshfsMountpoint="/tmp/goldeimer-prod"

__exitOnMissingSecret()
{
    if [ ! -s "$_secretPath" ]; then
        printf "\n>> [ERROR] %s\n" \
               "The remote webroot's abspath must be defined in " \
               "secret_remote_webroot_abspath.txt"
        exit 1
    fi
}

__exitOnMissingSecret

_remoteWebrootAbspath="$(
    cat "$_secretPath"
)"

__trapCtrlC() {
        printf "\n>> [ERROR] %s\n" "Shouldn't interrupt rsync"
}

__syncDir()
{
    _sourceDir="$_sshfsMountpoint/$1"
    _destDir="$_productionContentSyncDir/$2"

    printf "\n>> Syncing '%s'\n" "$_sourceDir"
    rsync -avzzP "$_sourceDir" "$_destDir"
}

# TODO: pass value for `exclude` arg to `__syncDir` as optional param
__syncNumericDir()
{
    _sourceDir="$_sshfsMountpoint/$1"
    _destDir="$_productionContentSyncDir/$2"

    printf "\n>> Syncing '%s'\n" "$_sourceDir"
    rsync -avzzP --exclude="*/*[!0-9]*/" "$_sourceDir" "$_destDir"
}

trap __trapCtrlC INT

printf "\n>> %s '%s'\n" "Creating temporary sshfs mountpoint"
       $_sshfsMountpoint
mkdir -p "$_sshfsMountpoint"

printf "\n>> %s\n" "Attaching production to sshfs mountpoint"
# Requires suiting entry in `~/.ssh/config`
sshfs goldeimer:"$_remoteWebrootAbspath" "$_sshfsMountpoint"

mkdir -p "$_productionContentSyncDir/wp-content/themes"

__syncDir "wp-content/plugins" "wp-content"

__syncDir "wp-content/themes/enfold" "wp-content/themes"
__syncDir "wp-content/themes/enfold-child" "wp-content/themes"

__syncNumericDir "wp-content/uploads" "wp-content"
__syncDir "wp-content/uploads/dynamic_avia" "wp-content/uploads"

printf "\n>> %s\n" "Unmounting production sshfs mount"
fusermount3 -u "$_sshfsMountpoint"
