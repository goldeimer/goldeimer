import {
    ColumnType,
    DataType
} from '@goldeimer/data-util'
import { identity } from '@goldeimer/js-util'

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
    columnType: ColumnType.auto,
    dataType: isEnum ? DataType.int : DataType.uuid,
    primaryDataType: dataType,
    getValidValueRange: !isEnum
        ? (bodyBeginIndex) => `$A$${bodyBeginIndex}:$A`
        : null,
    validValues: isEnum
        ? enums.map((enumItem) => enumItem.value)
        : null,
    value2ColorPairs
})

export const makeColumns = (
    columns,
    defaults = {},
    replaceTemplateTags = identity
) => columns.reduce((acc, [[
    columnId,
    columnName,
    columnDescription = '',
    columnType = defaults.columnType || ColumnType.Required,
    dataType = defaults.dataType || DataType.Text
], additionalArgs = {}
]) => {
    const isEnum = ColumnType.enum.is(columnType)
    const isForeignKey = ColumnType.foreignKey.is(columnType)

    const isSecondaryColumnNeeded = (
        isEnum || isForeignKey
    )

    const secondaryColumn = isSecondaryColumnNeeded
        ? [makeSecondaryColumn(isEnum, {
            columnDescription,
            columnId,
            columnName,
            dataType
        }, additionalArgs)]
        : []

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
