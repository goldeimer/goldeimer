import type { Slug }  from '../_import-stubs'

import type { PackageJson }  from '../schema'

export type ExportsFields = Pick<PackageJson,
    | 'browser'
    | 'exports'
    | 'main'
    | 'module'
    | 'types'
>

const mainExportPathFn = (
    packageSlug: Slug,
    distDir: Slug
) => (
    moduleKind: Slug,
    extension: Slug,
    targetEnv = ''
) => `./${distDir}/${targetEnv ? `${targetEnv}/` : ''}${moduleKind}/goldeimer.${packageSlug}.${targetEnv ? `${targetEnv}.` : ''}${moduleKind}.${extension}`

// TODO(Johannes):
// Make dynamic:
//   - `distDir`
//   - '/types/'
export const exportsFields = (
    packageSlug: Slug
) => {
    const distDir = 'dist'

    const mainExportPath = mainExportPathFn(
        packageSlug,
        distDir
    )

    const exports = {
        import: mainExportPath('esm', 'mjs'),
        require: mainExportPath('cjs', 'cjs'),
        node: {
            import: mainExportPath('esm', 'mjs', 'node'),
            require: mainExportPath('cjs', 'cjs', 'node')
        },
        default: mainExportPath('umd', 'js'),
    }

    return {
        browser: exports.default,
        exports: { '.': { ...exports } },
        main: exports.require,
        module: exports.import,
        types: `./${distDir}/types/${packageSlug}.d.ts`
    } as ExportsFields
}
