#!/usr/bin/env sh
# -*- coding: utf-8 -*-

# TODO(Johannes):
# Deprecate parts of this script centered around tagging / release in favor of
# a proper release worker written in the relevant language and inheriting from
# `ReleaseWorkerInterface`.
#
# @see `Symplify\MonorepoBuilder\Release\Contract\ReleaseWorker`

_projectAbspath="$(dirname "$(readlink -f "$0")")"

__usage()
{
    printf "%s\n\n%s\n\n\t%s\n\t%s\n\t%s\n\t%s\n" \
        "Usage:" \
        "$0 [options]" \
        "-c --clean-up" \
        "-h --help" \
        "-p --pre-split" \
        "-s --split"
}

__exitUsage()
{
    __usage
    exit 1
}

__forEachPackage()
{
    _command="$1"
    _relpath="$2"

    jq -r 'keys[]' < composer-repos.json | while read -r _dir ; do
        eval "$_command $_projectAbspath/$_dir/$_relpath"
    done
}

__preSplit()
{
    _commitMessage="package(php): commit static files on repo split \
(most recent production build of client-side source + static assets)"

    # Trigger fresh JS production builds for relevant packages.
    #
    # TODO(Johannes):
    # Replace w/ lerna:exec [...], implemented at a higher scope
    yarn workspace @goldeimer/wp-theme-goldeimer build:prod &&
    yarn workspace @goldeimer/wp-toilet-paper-calculator build:prod &&

    # `--force` flag is required to bypass .gitignore
    # (which is relevant for regular / manual commits to root monorepo)
    git add --force packages/**/static &&

    __forEachPackage "cp LICENSE" &&
    git add ./**/LICENSE &&

    git commit -m "$_commitMessage"

    # tag release here, if need be
}

__split()
{
    composer monorepo:split
}

# We commit to monorepo pre-split and revert here post-split,
# to avoid having to repeat it for every repo
# or having to write yet another abstraction.
#
# TODO(Johannes):
# Works just fine, but feels slightly hacky...
__cleanUp()
{
    git reset HEAD~1 &&
    __forEachPackage "rm" "LICENSE"
}

[ "$1" = "" ] && __exitUsage

while [ "$1" != "" ]; do
    _parameter=$(echo "$1" | awk -F= '{print $1}')

    case $_parameter in
        -h | --help)
            __usage
            ;;
        -c | --clean-up)
            __cleanUp
            ;;
        -p | --pre-split)
            __preSplit
            ;;
        -s | --split)
            __split
            ;;
        *)
            printf "%s\n\n" "[ERROR] Unknown parameter \"$_parameter\""
            __exitUsage
            ;;
    esac
    shift
done
