import {
    JsonUpdater as jsonUpdater
} from './JsonUpdater/JsonUpdater'
import { keywords } from './Keywords'

import { PackageJson } from './schema'
export { PackageJson }

export * from './interface'
export * from './packageDefinition'

jsonUpdater<PackageJsonSchema>()

export type Person = Exclude<PackageJson.Person, string>

export interface ManifestArgs {
    organization: Person
}

export const manifest = ({
    organization
}: ManifestArgs) => ({
    author: {
        name: organization.name ?? 'Goldeimer gemeinnützige GmbH'
    }
 } as PackageJson)


 const a = manifest({ organization: { name: '' }})



export const defaultManifest = ({

}: DefaultManifestArgs) => manifest()
