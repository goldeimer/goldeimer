import { TsConfig } from '../schema'

export const watch: TsConfig<4.1> = {
    fallbackPolling: 'dynamicPriorityPolling',
    watchDirectory: 'useFsEvents',
    watchFile: 'useFsEvents'
}
