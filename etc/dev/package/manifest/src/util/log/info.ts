import { formatLogMessage } from './log'

export const info = (message: string) => {
    console.info(
        formatLogMessage(
            message,
            { level: 'INFO' }
        )
    )
}
