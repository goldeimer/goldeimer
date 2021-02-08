import {
    JsonUpdater.updater as jsonUpdater
} from './JsonUpdater/JsonUpdater'

import { PackageJsonSchema } from './schema'
export { PackageJsonSchema }

export * from './interface'
export * from './packageDefinition'

export const PackageJsonUpdater = jsonUpdater<PackageJsonSchema>()
