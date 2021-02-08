#!/usr/bin/env node

/* eslint-disable import/extensions */

import { writeFileSync } from 'fs'
import path from 'path'

import commandLine
    from './partial/tsconfig.command-line.js'
import compilerOptionAdvance
    from './partial/tsconfig.compiler.advanced.js'
import compilerOptionExperimental
    from './partial/tsconfig.compiler.experimental.js'
import compilerOptionLinterChecks
    from './partial/tsconfig.compiler.linter-checks.js'
import compilerOptionModuleResolution
    from './partial/tsconfig.compiler.module-resolution.js'
import compilerOptionProject
    from './partial/tsconfig.compiler.project.js'
import compilerOptionSourceMaps
    from './partial/tsconfig.compiler.source-maps.js'
import compilerOptionStrictChecks
    from './partial/tsconfig.compiler.strict-checks.js'
import fileInclusion
    from './partial/tsconfig.file-inclusion.js'
import watch
    from './partial/tsconfig.watch.js'

// TODO(Johannes):
// Add 'tsc' option?
// (might not be necessary, might want to stick to a single option,
// for the sake of simplicity)
const config = {
    transpiler: 'babel'
}

const tsconfig = {
    $schema: 'https://json.schemastore.org/tsconfig',
    ...commandLine,
    ...fileInclusion,
    ...watch,
    compilerOptions: {
        ...compilerOptionAdvance,
        ...compilerOptionExperimental,
        ...compilerOptionLinterChecks,
        ...compilerOptionModuleResolution,
        ...compilerOptionProject(config),
        ...compilerOptionSourceMaps,
        ...compilerOptionStrictChecks
    }
}

try {
    writeFileSync(
        path.resolve('tsconfig.json'),
        `${JSON.stringify(
            tsconfig,
            null,
            4
        )}\n`
    )
} catch (err) {
    console.error(err)
}
