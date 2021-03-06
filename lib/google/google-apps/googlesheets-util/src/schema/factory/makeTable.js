import {
    TableType
} from '../enum'

const makeTable = (
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

export default makeTable
