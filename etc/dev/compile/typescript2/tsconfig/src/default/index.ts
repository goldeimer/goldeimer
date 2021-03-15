import { JsonValue } from 'type-fest'

import { compilerOptions } from './compiler-options'
import { commandLine } from './tsconfig.command-line'
import { fileInclusion } from './tsconfig.file-inclusion'
import { watch } from './tsconfig.watch'

export const DefaultTsConfig = {
    compilerOptions,
    ...commandLine,
    ...watch
} as { [k: string]: JsonValue }
