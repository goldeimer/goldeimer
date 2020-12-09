#!/usr/bin/env sh
# -*- coding: utf-8 -*-

_abspath="$(dirname "$(readlink -f "$0")")"

_composerJson="composer.wp-content.production.json"
_destDir=$_abspath
# _mode="production"

_repositoryUrl='{
    "type": "vcs",
    "url" : "https://github.com/goldeimer/wp-install.git"
}'

__usage()
{
    printf "%s\n\n%s\n\n\t%s\n\t%s\n\t%s\n\t%s\n" \
        "Usage:" \
        "$0 [options]" \
        "-h --help" \
        "-c --composer-json" \
        "-d --destination-path" \
        "-m --mode"
}

__exitUsage()
{
    __usage
    exit 1
}

while [ "$1" != "" ]; do
    _parameter=$(echo "$1" | awk -F= '{print $1}')
    _value=$(echo "$1" | awk -F= '{print $2}')

    case $_parameter in
        -h | --help)
            __usage
            exit 0
            ;;
        -c | --composer-json)
            _composerJson=$_value
            ;;
        -d | --destination-path)
            _destDir=$_value
            ;;
        # -m | --mode)
        #     _mode=$_value
        #     ;;
        *)
            printf "%s\n\n" "[ERROR] Unknown parameter \"$_parameter\""
            __exitUsage
            ;;
    esac
    shift
done

COMPOSER="$_composerJson" composer create-project \
                                   goldeimer/wp-install \
                                   "$_destDir" \
                                   dev-master \
                                   --repository-url="$_repositoryUrl" \
                                   --prefer-dist
