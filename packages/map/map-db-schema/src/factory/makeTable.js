import {
    TableType
} from '@goldeimer/data-util'

export const makeTable = (
    tableName,
    recordName,
    recordPluralName,
    tableDescription,
    tableType = TableType.Default,
    initialRowCount = 1e3
) => ({
    flattenedColumns: [],
    initialRowCount,
    links: [],
    sections: [],
    recordName,
    recordPluralName,
    tableDescription,
    tableName,
    tableType
})
