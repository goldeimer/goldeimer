import {
    TABLES
} from '../schema'

import createTable, {
    AS_FIRST_TABLE
} from './createTable'

export const updateSchema = () => {
    const sortedTables = TABLES.sort((
        { tableNameA },
        { tableNameB }
    ) => (
        tableNameA < tableNameB
            ? -1
            : tableNameA > tableNameB
                ? -1
                : 0
    ))

    let previousTableName = AS_FIRST_TABLE
    const sheetIndices = sortedTables.reduce((
        acc,
        { tableName },
        index
    ) => {
        const ret = {
            ...acc,
            [tableName]: {
                index,
                previousTableName
            }
        }

        previousTableName = tableName

        return ret
    }, {})

    TABLES.forEach(({
        initialRowCount,
        sections,
        tableDescription,
        tableName,
        tabletype
    }) => {
        createTable({
            initialRowCount,
            sections,
            tableDescription,
            tableName,
            tabletype
        }, {
            afterTableName: sheetIndices[tableName].previousTableName,
            atIndex: sheetIndices[tableName].index,
            deleteIfExists: false,
            updateIfExists: true
        })

        previousTableName = tableName
    })
}
