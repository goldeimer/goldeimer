/// <reference types="node" />

import { existsSync } from 'fs'
import { basename, dirname } from 'path'

import { readFile as _readFile } from '@typed/node'

import { error, warning, ExitCode } from '../log'

// TODO(Johannes):
// Get rid of the `undefined` in the return signature.
export const readFile = (
    path: string,
    hasFallback: boolean = true,
    defaultContentsUsedMessage: string = 'Falling back to default contents.'
): ReturnType<typeof _readFile> => {
    const _basename = basename(path)
    const _dirname = dirname(path)

    if (!existsSync(_dirname)) {
        error(
            `Working directory \`${_dirname}\` does not exist.`,
            ExitCode.FileSystemError
        )
    }

    if (!existsSync(path)) {
        const fileNotExistsMessage = `File \`${_basename}\` does not exist in directory \`${_dirname}\`.`
        if (!hasFallback) {
            error(
                fileNotExistsMessage,
                ExitCode.FileSystemError
            )
        }

        warning(`${fileNotExistsMessage} ${defaultContentsUsedMessage}`)
    }

    return _readFile(path)
}
