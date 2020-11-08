import {
    TABLE_TYPE
} from '@gs/enum'

const makeTable = (
    tableName,
    recordName,
    recordPluralName,
    tableDescription,
    tableType = TABLE_TYPE.default,
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
