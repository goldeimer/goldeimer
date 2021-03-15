import { DefaultTsConfig } from './default'
import { writeJsonFile } from './util'

export const writeConfig = (options = {}) => writeJsonFile({
    ...DefaultTsConfig,
    ...options
}, {
    filePath: 'tsconfig.json',
})
