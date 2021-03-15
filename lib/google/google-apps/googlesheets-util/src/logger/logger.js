import {
    LogLevel,
    LogTableType
} from '@goldeimer/logging'

const log = (
    message,
    logLevel = LogLevel.Info,
    targetLogTable = LogTableType.Runtime
) => {
    // TODO: Implement.
}

const error = (
    message,
    targetLogTable = LogTableType.Runtime
) => log(
    message,
    LogLevel.Error
)

const warn = (
    message,
    targetLogTable = LogTableType.Runtime
) => log(
    message,
    LogLevel.Warning
)

export const googleSheetsApiLogger = {
    dir: log,
    error,
    log,
    warn
}
