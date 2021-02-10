/// <reference types="node" />

import { exit } from 'process'

import { formatLogMessage } from './log'

export const error = (
    message: string,
    exitCode: number = 1
) => {
    console.error(
        formatLogMessage(
            message,
            { level: 'ERROR' }
        )
    )

    exit(exitCode)
}
