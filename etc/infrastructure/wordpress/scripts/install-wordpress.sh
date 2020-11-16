#!/usr/bin/env sh
# -*- coding: utf-8 -*-

_abspath="$(dirname "$(readlink -f "$0")")"

_composerJson="composer.wp-content.production.json"
_destDir=$_abspath
# _mode="production"

_repositoryUrl='{
    "type": "vcs",
    "url" : "https://github.com/goldeimer/wordpress-installer.git"
}'

__usage()
{
    printf "%s\n%s\n\n%s\n%s\n%s\n%s\n" \
        "Usage:" \
        "./$0 [options]" \
        "\t-h --help" \
        "\t-c --composer-json" \
        "\t-d --destination-path" \
        "\t-m --mode"
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
                                   goldeimer/wordpress-installer \
                                   "$_destDir" \
                                   dev-master \
                                   --repository-url="$_repositoryUrl" \
                                   --prefer-dist
