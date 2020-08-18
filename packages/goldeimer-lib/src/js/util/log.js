import {
    LOG_TARGET
} from '@lib/enum'

import {
    IS_PRODUCTION_BUILD
} from '@lib/util/env'

import noop from '@lib/util/noop'

import {
    googleSheetsApiLogger
} from '@gs/logger'

const logTargetToLogger = (logTarget) => {
    switch (logTarget) {
        case LOG_TARGET.database.is(logTarget):
            return googleSheetsApiLogger

            // case LOG_TARGET.console.is(logTarget):
        default:
            return console
    }
}

const Logger = (
    logTarget = LOG_TARGET.console,
    shouldLogInProduction
) => {
    if (
        !shouldLogInProduction &&
        IS_PRODUCTION_BUILD
    ) {
        return {
            dir: noop,
            log: noop,
            warning: noop,
            error: noop
        }
    }

    const methods = {}

    const logger = logTargetToLogger(logTarget)

    methods.dir = (instance) => {
        logger.dir(instance)
    }

    methods.error = (message) => {
        logger.error(message)
    }

    methods.log = (message) => {
        logger.log(message)
    }

    methods.warn = (message) => {
        logger.warn(message)
    }

    return methods
}

export {
    Logger as default,
    LOG_TARGET
}
