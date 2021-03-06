import {
    LibraryPurpose,
    PackageKind
} from './enum'

export const DefaultKeywords = ['goldeimer']

export const LibraryPurpose2Keywords = {
    [LibraryPurpose.ExternalApi]: [
        'api-wrapper',
        'exposed-api-wrapper',
        'shared-api-wrapper'
    ],
    [LibraryPurpose.Assets]: [
        'asset',
        'shared-assets'
    ],
    [LibraryPurpose.Components]: [
        'component',
        'shared-components'
    ],
    [LibraryPurpose.ExternalApi]: [
        'api-wrapper',
        'external-api-wrapper'
    ],
    [LibraryPurpose.Interface]: [
        'interface',
        'pluggable',
        'shared-interface'
    ],
    [LibraryPurpose.Utility]: [
        'goldeimer-util',
        'util',
        'utility'
    ],
    [LibraryPurpose.Type]: [
        'shared-type',
        'type'
    ]
}

export const PackageKind2KeywordsMapper = {
    [PackageKind.Application]: ['app'],
    [PackageKind.Configuration]: ['config', 'goldeimer-config'],
    [PackageKind.Library]: ['library'],
    [PackageKind.Meta]: ['meta-package']
}

export const keywords = (
    packageKind: PackageKind,

)
