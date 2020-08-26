#!/usr/bin/sh
#
# @brief Deploys built client application as well as
#        the WordPress plugin serving as a backend.

_packageSlug="abenteuer-regenwald-campaign"
_packageAbspath="$(dirname "$(readlink -f "$0")")"

_distributionDir="$_packageAbspath/dist"

# expected to be configured in `~/.ssh/config`
_sshHostName="goldeimer"

_remoteDestDirName=$_packageSlug
_remoteRelPathClientApp="../$_remoteDestDirName/"
_remoteRelPathWordPressPlugin="../goldeimer.de/goldeimer/wp-content/plugins/$_remoteDestDirName/"

_remoteAddressClientApp="$_sshHostName:$_remoteRelPathClientApp"
_remoteAddressWordPressPlugin="$_sshHostName:$_remoteRelPathWordPressPlugin"

__onError()
{
    # TODO: Better error handling.
    printf ">> %s\n" "Deployment of '$_packageSlug' failed with exit code $?."

    exit 1
}

__onSuccess()
{
    printf ">> %s\n" "Successfully deployed '$_packageSlug'."

    exit 0
}

trap __onError ERR

# TODO:
# Keep ssh auth alive.
# Currently this requires password entry 4 times.
# We *should* be using key-based auth anyway.
# artfiles...

printf ">> %s\n" "Transferring built client app to 'goldeimer.de' production host"
ssh "$_sshHostName" "mkdir -p $_remoteRelPathClientApp"
scp -r "$_packageAbspath/dist/"* "$_remoteAddressClientApp"

printf ">> %s\n" "Transferring WordPress plugin to 'goldeimer.de' production host"
ssh "$_sshHostName" "mkdir -p $_remoteRelPathWordPressPlugin"
scp -r "$_packageAbspath/src/backend-wordpress-plugin/"* "$_remoteAddressWordPressPlugin"

__onSuccess
