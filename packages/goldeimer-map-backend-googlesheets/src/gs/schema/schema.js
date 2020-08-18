import { TABLE_TYPE } from '@gs/enum'

import {
    recordNameToKey
} from '@gs/record'

import TabMeta from '@gs/schema/000-TabMeta'
import TabTaxonomy from '@gs/schema/100-TabTaxonomy'
import TabTerm from '@gs/schema/110-TabTerm'
import TabFeature from '@gs/schema/200-TabFeature'
import TabFeature2Term from '@gs/schema/205-TabFeature2Term'
import TabSettings from '@gs/schema/300-TabSettings'
import TabTheme from '@gs/schema/310-TabTheme'
import TabMessageQueue from '@gs/schema/400-TabMessageQueue'
import TabSearchLog from '@gs/schema/500-TabSearchLog'

const TABLES = [
    TabMeta,
    TabTaxonomy,
    TabTerm,
    TabFeature,
    TabFeature2Term,
    TabSettings,
    TabTheme,
    TabMessageQueue,
    TabSearchLog
]

const tableAcc = TABLE_TYPE.keys.reduce((acc, key) => ({
    ...acc,
    tableType: {
        ...acc.tableType,
        [key]: []
    }
}))

const sortLookup = (lookup) => TABLE_TYPE.keys.forEach((
    key
) => lookup[key].sort((
    { recordNameA },
    { recordNameB }
) => (
    recordNameA === recordNameB
        ? 0
        : recordNameA < recordNameB
            ? -1
            : 1
)))

const TABLE_LOOKUP = sortLookup(
    TABLES.reduce((acc, table) => ({
        ...acc,
        [table.tableType]: [...acc[table.tableType], table],
        [table.tableName]: table,
        ...{ [recordNameToKey(table.recordName)]: table },
        ...{ [recordNameToKey(table.recordPluralName)]: table }
    }), tableAcc)
)

export {
    TabFeature,
    TabMessageQueue,
    TabSearchLog,
    TabSettings,
    TabTaxonomy,
    TabTerm,
    TABLES,
    TABLE_LOOKUP
}

export {
    default as HEADER
} from '@gs/schema/header'

export {
    default as LOG_TABLE
} from '@gs/schema/enumLogTable'
