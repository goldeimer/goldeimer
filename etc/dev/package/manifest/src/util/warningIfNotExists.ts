/// <reference types="node" />

import { existsSync } from 'fs'

import { warning } from './log'

export const warningIfNotExists = (
    path: string,
    message?: string
) => {
    if (!existsSync(path)) {
        warning(
            message ?? `Path '${path}' does not exist.`
        )
    }
}
