import {
    ColumnType,
    DataType,
    TableType
} from '@goldeimer/data-util'
import {
    camelCase,
    capitalizeFirst,
    pascalCase
} from '@goldeimer/js-util'

import { connectMany2Many } from './makeLink'
import { withSection } from './makeSection'
import { makeTable } from './makeTable'

export const makeRalationshipTable = (
    tabA,
    tabB
) => {
    connectMany2Many(tabA, tabB)

    const relationshipName = (
        `${pascalCase(tabA.recordName)}2${pascalCase(tabB.recordName)}`
    )

    return withSection(makeTable(
        relationshipName,
        `${tabA.recordName} to ${tabB.recordName} relationship`,
        `${tabA.recordName} to ${tabB.recordName} relationships`,
        `Associations between ${tabA.recordPluralName} and ${tabB.recordPluralName}`,
        TableType.relationship,
        1e4
    ), [[[
        camelCase(tabA.recordName),
        capitalizeFirst(tabA.recordName),
        `Reference to ${tabA.recordPluralName}`,
        ColumnType.Required,
        DataType.ForeignKey
    ], [
        camelCase(tabB.recordName),
        capitalizeFirst(tabB.recordName),
        `Reference to ${tabB.recordPluralName}`,
        ColumnType.Required,
        DataType.ForeignKey
    ]]])
}
