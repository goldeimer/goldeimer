import { identity } from '@lib/util'

import {
    COLUMN_TYPE,
    DATA_TYPE
} from '@gs/enum'

const formatDescription = (description) => (
    Array.isArray(description) && description.length > 1
        ? `${description[0]} (defaults to ${description[1]})`
        : description
)

const makeSecondaryColumn = (isEnum, {
    columnDescription = '',
    columnId,
    columnName,
    dataType
}, {
    enums = [],
    value2ColorPairs = []
}) => ({
    columnDescription,
    columnId: isEnum
        ? `${columnId}Value`
        : `${columnId}Id`,
    columnName: `${columnName} (${isEnum ? 'Value' : 'ID'})`,
    columnType: COLUMN_TYPE.auto,
    dataType: isEnum ? DATA_TYPE.int : DATA_TYPE.uuid,
    primaryDataType: dataType,
    getValidValueRange: !isEnum
        ? (bodyBeginIndex) => `$A$${bodyBeginIndex}:$A`
        : null,
    validValues: isEnum
        ? enums.map((enumItem) => enumItem.value)
        : null,
    value2ColorPairs
})

const makeColumns = (
    columns,
    defaults = {},
    replaceTemplateTags = identity
) => columns.reduce((acc, [[
    columnId,
    columnName,
    columnDescription = '',
    columnType = defaults.columnType || COLUMN_TYPE.required,
    dataType = defaults.dataType || DATA_TYPE.text
], additionalArgs = {}
]) => {
    const isEnum = COLUMN_TYPE.enum.is(columnType)
    const isForeignKey = COLUMN_TYPE.foreignKey.is(columnType)

    const isSecondaryColumnNeeded = (
        isEnum || isForeignKey
    )

    const secondaryColumn = isSecondaryColumnNeeded
        ? [makeSecondaryColumn(isEnum, {
            columnDescription,
            columnId,
            columnName,
            dataType
        }, additionalArgs)] : []

    return [
        ...acc, {
            columnDescription: replaceTemplateTags(
                formatDescription(columnDescription)
            ),
            columnId,
            columnName,
            columnType,
            dataType,
            ...{
                defaultValue: defaults.value || null,
                validations: [],
                ...additionalArgs,
                validValues: isEnum
                    ? (additionalArgs.enums || []).map(
                        (enumItem) => enumItem.key
                    )
                    : null,
                value2ColorPairs: additionalArgs.key2ColorPairs || []
            }
        },
        ...secondaryColumn
    ]
}, [])

export default makeColumns
