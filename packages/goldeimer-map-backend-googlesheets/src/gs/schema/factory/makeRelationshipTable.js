import {
    camelCase,
    capitalizeFirst,
    pascalCase
} from '@lib/util'

import {
    COLUMN_TYPE,
    DATA_TYPE,
    TABLE_TYPE
} from '@gs/enum'

import {
    connectMany2Many
} from '@gs/schema/factory/makeLink'

import {
    withSection
} from '@gs/schema/factory/makeSection'

import makeTable from '@gs/schema/factory/makeTable'

const makeRalationshipTable = (
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
        TABLE_TYPE.relationship,
        1e4
    ), [[[
        camelCase(tabA.recordName),
        capitalizeFirst(tabA.recordName),
        `Reference to ${tabA.recordPluralName}`,
        COLUMN_TYPE.required,
        DATA_TYPE.foreignKey
    ], [
        camelCase(tabB.recordName),
        capitalizeFirst(tabB.recordName),
        `Reference to ${tabB.recordPluralName}`,
        COLUMN_TYPE.required,
        DATA_TYPE.foreignKey
    ]]])
}

export default makeRalationshipTable
