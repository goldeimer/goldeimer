import {
    DATA_TYPE,
    TABLE_TYPE
} from '@gs/enum'

import {
    makeTable,
    withSections
} from '@gs/schema/factory'

const TAB = withSections(makeTable(
    'Meta',
    'meta value',
    'meta values',
    'Meta data about this application instance',
    TABLE_TYPE.meta
), [[[[
    [
        'databaseVersion',
        'Database version',
        `The version of the app's database schema
this instance is runnning on`,
        DATA_TYPE.integer
    ],
    { validations: { min: 1 } }
]], [
    'Versioning',
    `Versioning to allow for smooth migrations
and to keep clients and backend in sync`
]]])

export default TAB
