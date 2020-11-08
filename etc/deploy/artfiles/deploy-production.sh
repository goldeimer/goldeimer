#!/usr/bin/sh
#
# @brief Utility script to facilitate deployments to the current "arfiles"
#        production host via ssh.

_repoAbspath="$(dirname "$(dirname "$(dirname "$(dirname "$(readlink -f "$0")")")")")"

# expected to be configured in `~/.ssh/config`
_sshHostName="goldeimer"

__transfer()
{
    __usage()
    {
        printf ">> %s\n" "Script expects exactly two arguments: pkg_name remote_rel_path"
    }

    [ $# -ne 2 ] && __usage; exit 1

    _packageSlug="$1"
    # on the current production host, the ssh user's home directory 'sshroot'
    # is a subdir of the webroot, shift the relpath one up
    _remoteRelPath="../$2"

    _packageAbspath="$_repoAbspath/packages/$_packageSlug"

    __onError()
    {
        # TODO: Better error handling.
        printf ">> %s\n" "Deployment of '$_packageSlug' failed with exit code $?."

        exit 1
    }

    __onSuccess()
    {
        printf ">> %s\n" "Successfully deployed '$_packageSlug' to '$_remoteRelPath'."

        exit 0
    }

    trap __onError INT HUP

    printf ">> %s\n" "Creating deployment directory '$_remoteRelPath', if not exists:"
    # shellcheck disable=SC2029
    # sc warns about variable expansion on the client side.
    # We *do want* that though.
    # `$_remoteRelPath` won't be available in the server's environment... :)
    ssh "$_sshHostName" "mkdir -p $_remoteRelPath"

    printf ">> %s\n" "Transferring '$_packageSlug' to production host:"
    scp -r "$_packageAbspath/dist/"* "$_remoteRelPath"
}
