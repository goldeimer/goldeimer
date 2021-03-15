export const formatLogPrefixOutput = (prefix?: string) => prefix ? `${prefix} | ` : ''

export const formatLogLevelOutput = (level?: string) => level ? `[${level}] ` : ''

export const formatLogMessage = (message: string, {
    level,
    prefix = 'goldeimer-cli'
}: {
    level: string,
    prefix?: string
}): string => `${formatLogPrefixOutput(prefix)}${formatLogLevelOutput(level)}${message}`

export const log = (
    message: string
) => {
    console.log(
        formatLogMessage(
            message,
            { level: 'INFO' }
        )
    )
}
