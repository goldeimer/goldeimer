import {
    DataType,
    TableType
} from '@goldeimer/data-util'

import {
    makeTable,
    withSections
} from './factory'

export const TabMeta = withSections(makeTable(
    'Meta',
    'meta value',
    'meta values',
    'Meta data about this application instance',
    TableType.Meta
), [[[[
    [
        'databaseVersion',
        'Database version',
        `The version of the app's database schema
this instance is runnning on`,
        DataType.Integer
    ],
    { validations: { min: 1 } }
]], [
    'Versioning',
    `Versioning to allow for smooth migrations
and to keep clients and backend in sync`
]]])
