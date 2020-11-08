import {
    LOG_LEVEL
} from '@lib/enum'

import {
    LOG_TABLE_TYPE
} from '@gs/enum'

const log = (
    message,
    logLevel = LOG_LEVEL.info,
    targetLogTable = LOG_TABLE_TYPE.runtime
) => {
    // TODO: Implement.
}

const error = (
    message,
    targetLogTable = LOG_TABLE_TYPE.runtime
) => log(
    message,
    LOG_LEVEL.error
)

const warn = (
    message,
    targetLogTable = LOG_TABLE_TYPE.runtime
) => log(
    message,
    LOG_LEVEL.warning
)

const googleSheetsApiLogger = {
    dir: log,
    error,
    log,
    warn
}

export {
    /* eslint-disable-next-line import/prefer-default-export */
    googleSheetsApiLogger
}
