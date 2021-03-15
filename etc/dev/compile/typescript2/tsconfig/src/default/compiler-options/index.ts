import { advanced } from './tsconfig.compiler.advanced'
import { experimental } from './tsconfig.compiler.experimental'
import { linterChecks } from './tsconfig.compiler.linter-checks'
import { moduleResolution } from './tsconfig.compiler.module-resolution'
import { project } from './tsconfig.compiler.project'
import { sourceMaps } from './tsconfig.compiler.source-maps'
import { strictChecks } from './tsconfig.compiler.strict-checks'

export const compilerOptions = {
    ...advanced,
    ...experimental,
    ...linterChecks,
    ...moduleResolution,
    ...project,
    ...sourceMaps,
    ...strictChecks
}
