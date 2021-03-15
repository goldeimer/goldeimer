import { formatLogMessage } from './log'

export const warning = (message: string) => {
    console.warn(
        formatLogMessage(
            message,
            { level: 'WARNING' }
        )
    )
}
