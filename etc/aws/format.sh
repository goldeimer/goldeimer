#!/usr/bin/sh

_workingDirectory="$1"

if [ "$_workingDirectory" = "" ]; then
    _workingDirectory="$(dirname "$(readlink -f "$0")")"
fi

__invalidDirectory()
{
    printf "%s\n\n" "[ERROR] Invalid directory: $_workingDirectory"
    exit 1
}

[ ! -d "$_workingDirectory" ] && __invalidDirectory

find "$_workingDirectory" -type f -name "*.tf" -exec terraform fmt {} \;
