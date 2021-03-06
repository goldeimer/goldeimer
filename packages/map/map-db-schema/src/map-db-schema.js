import { TableType } from '@goldeimer/data-util'

import {
    recordNameToKey
} from '@gs/record'

import { TabMeta } from './000-TabMeta'
import { TabTaxonomy } from './100-TabTaxonomy'
import { TabTerm } from './110-TabTerm'
import { TabFeature } from './200-TabFeature'
import { TabFeature2Term } from './205-TabFeature2Term'
import { TabSettings } from './300-TabSettings'
import { TabTheme } from './310-TabTheme'
import { TabMessageQueue } from './400-TabMessageQueue'
import { TabSearchLog } from './500-TabSearchLog'

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

const tableAcc = TableType.keys.reduce((acc, key) => ({
    ...acc,
    tableType: {
        ...acc.tableType,
        [key]: []
    }
}))

const sortLookup = (lookup) => TableType.forEach((
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
