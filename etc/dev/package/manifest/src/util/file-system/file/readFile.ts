/// <reference types="node" />

import { existsSync, readFileSync } from 'fs'
import { basename, dirname } from 'path'

import { error, warning, ExitCode } from '../../log'

export type Default<T> = {
    message: 'Falling back to default values.'
    value: T
}

export const makeDefault = <T>(value: T) => ({ value } as Default<T>)

export const readFile = (
    path: string,
    _default = makeDefault(Buffer.from('{}'))
) => {
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
        if (!_default) {
            error(
                fileNotExistsMessage,
                ExitCode.FileSystemError
            )
        }

        warning(`${fileNotExistsMessage} ${_default.message}`)

        return _default.value
    }

    return readFileSync(path)
}
