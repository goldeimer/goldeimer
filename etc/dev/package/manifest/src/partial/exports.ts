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
    extension: Slug
) => `./${distDir}/${moduleKind}/goldeimer.${packageSlug}.${moduleKind}.${extension}`

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
        browser: mainExportPath('umd', 'js'),
        import: mainExportPath('esm', 'mjs'),
        require: mainExportPath('cjs', 'cjs')
    }

    return {
        browser: exports.browser,
        exports: { '.': { ...exports } },
        main: exports.require,
        module: exports.import,
        types: `./${distDir}/types/${packageSlug}.d.ts`
    } as ExportsFields
}
