/// <reference types="node" />

import { merge, sort } from '@goldeimer/collection'

import { baseDirname, file } from './util/file-system'
import type { PackageId } from './_import-stubs'

import {
    exportsFields,
    name,
    repositoryFields
} from './partial'

import type {
    PackageJson
}  from './schema'

import {
    resolveManifestPath
} from './util'

import {
    accessPrivate,
    accessPublic,
    base,
    dependenciesCommon
}  from './template'

// export type PackageJsonKey = keyof PackageJson

// export type UpdateManifestOptions = {
//     keys: {
//         exclude: PackageJsonKey[],
//         immutable: PackageJsonKey[] | boolean,
//         include: PackageJsonKey[],
//         mutable: PackageJsonKey[]
//     }
// }

export const getDefaults = (
    packageId: PackageId,
    relpath: string,
    isPrivate: boolean = false
) => merge<PackageJson>({
        name: name(packageId)
    },
    repositoryFields({
            name: 'goldeimer',
            owner: 'goldeimer'
        },
        relpath
    ),
    isPrivate ? accessPrivate : accessPublic,
    exportsFields(packageId.slug),
    base as PackageJson
)

export const updateManifest = (path: string) => {
    const abspath = resolveManifestPath(path)

    console.log(abspath)

    const manifest = file(abspath)

    const content = JSON.parse(manifest.string)

    manifest.save(
        JSON.stringify(
            sort(
                merge(
                    content,
                    getDefaults(
                        { scope: 'goldeimer', slug: baseDirname(abspath) },
                        path
                    ),
                    dependenciesCommon
                )
            ),
            null,
            4
        )
    )
}
