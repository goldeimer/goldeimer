import {
    UI_TITLE
} from '@gs/config'

import {
    COLUMN_TYPE,
    TABLE_TYPE,
    dataTypeKeyToCapitalizationFunction
} from '@gs/enum'

import {
    applyConditionalFormattingRuleDefinitions,
    formatByColumnType,
    formatEmphasis,
    formatFootnote,
    formatTableName
} from '@gs/formatting'

import {
    adjustColumnSize,
    adjustSheetSize,
    deleteSheet,
    getActiveSheet,
    getSheetByName,
    getSheetCount,
    getSheetIndexAfterName,
    getSheets,
    insertSheet
} from '@gs/sheet'

import {
    applySheetValidation
} from '@gs/validation'

const AS_FIRST_TABLE = '$First'

const formatColumn = ({
    columnBodyRange,
    columnHeaderRange,
    columnType,
    dataType,
    isVertical,
    sheet,
    value2ColorPairs = []
}) => {
    formatByColumnType(
        columnHeaderRange,
        columnType,
        true
    )

    formatByColumnType(
        columnBodyRange,
        columnType
    )

    if (value2ColorPairs.length) {
        applyConditionalFormattingRuleDefinitions(
            value2ColorPairs.map(([
                value,
                color
            ]) => ([{
                dataType,
                predicateValue: value
            }, {
                color
            }])),
            columnBodyRange
        )
    }

    if (columnType === COLUMN_TYPE.auto) {
        if (isVertical) {
            sheet.hideRow(columnBodyRange)
        } else {
            sheet.hideColumn(columnBodyRange)
        }
    }
}

const getColumnIds = ({
    isVertical = false,
    rowIndexAtBeginOfTableBody,
    rowIndexAfterTableHeader,
    sheet = getActiveSheet()
}) => sheet.getRange(
    isVertical
        ? rowIndexAtBeginOfTableBody + 1
        : rowIndexAfterTableHeader,
    1,
    isVertical
        ? sheet.getLastRow()
        : 1,
    isVertical
        ? 1
        : sheet.getLastColumn()
).getValues()[0]

const getColumnRanges = ({
    actualColumnSize,
    actualRowSize,
    columnHeaderSize,
    currentColumnIndex,
    isVertical,
    rowIndexAtBeginOfTableBody,
    rowIndexBeforeTableBody,
    sheet
}) => ([
    sheet.getRange(
        isVertical
            ? currentColumnIndex
            : rowIndexAtBeginOfTableBody,
        isVertical
            ? columnHeaderSize + 1
            : currentColumnIndex,
        isVertical
            ? 1
            : actualRowSize - rowIndexBeforeTableBody,
        isVertical
            ? actualColumnSize - columnHeaderSize
            : 1
    ),
    sheet.getRange(
        isVertical
            ? currentColumnIndex
            : 1,
        isVertical
            ? 1
            : currentColumnIndex,
        isVertical
            ? 1
            : rowIndexBeforeTableBody,
        isVertical
            ? columnHeaderSize
            : 1
    )
])

const getMinColumnSize = ({
    existingColumnIds,
    isVertical = false,
    sections,
    wasInserted
}) => {
    const columnIds = sections.reduce((acc, { columns }) => ([
        ...acc,
        ...columns.reduce((acc2, { columnId }) => ([
            ...acc2,
            columnId
        ]), [])
    ]), [])

    const titlesSize = isVertical
        ? sections.length
        : 0

    const size = columnIds.length + titlesSize

    if (wasInserted) {
        return size
    }

    const extraSize = existingColumnIds.filter(
        (existingColumnId) => !columnIds.includes(existingColumnId)
    ).length

    return size + extraSize + titlesSize
}

const insertTable = ({
    afterTableName = null,
    atIndex = null,
    deleteIfExists = false,
    tableName
}) => {
    let dummySheet = null
    const existingSheet = getSheetByName(tableName)

    if (existingSheet) {
        if (!deleteIfExists) {
            return [existingSheet, false]
        }

        if (getSheets().length === 1) {
            dummySheet = insertSheet('dummy')
        }

        deleteSheet(existingSheet)
    }

    const sheetIndexAfterName = getSheetIndexAfterName(
        afterTableName
    )

    const insertAt = sheetIndexAfterName !== -1
        ? sheetIndexAfterName
        : afterTableName === AS_FIRST_TABLE
            ? 0
            : atIndex || null

    const sheet = insertAt !== null && insertAt <= getSheetCount()
        ? insertSheet(tableName, insertAt)
        : insertSheet(tableName)

    if (dummySheet) {
        deleteSheet(dummySheet)
    }

    return [sheet, true]
}

const isVerticalTitle = (
    rowIndex,
    sheet
) => sheet.getRange(rowIndex, 1)
    .isPartOfMerge()

const insertVerticalTitle = ({
    note,
    numColumns,
    rowIndex,
    sheet,
    title,
    wasInserted
}) => {
    if (
        !wasInserted &&
        !isVerticalTitle(rowIndex, sheet)
    ) {
        sheet.insertRows(rowIndex)
    }

    sheet.getRange(
        rowIndex,
        1,
        1,
        numColumns
    )
        .merge()
        .setValue(title)
        .setNote(note)
}

const makeColumnHeader = (
    column,
    sectionTitle = null,
    isVertical = false
) => {
    const header = [[
        column.columnId,
        'Column ID',
        formatEmphasis,
        null,
        true
    ], [
        column.columnName,
        column.columnDescription,
        formatEmphasis
    ]]

    if (!isVertical && sectionTitle) {
        header.push([
            sectionTitle,
            'Column Group'
        ])
    }

    header.push([
        `${dataTypeKeyToCapitalizationFunction(column.dataType.key)(column.dataType.key)} (${column.columnType.key})`,
        'Data type (colum type)',
        formatFootnote
    ])

    return header
}

const populateColumnHeaderCellImpl = (
    [
        value,
        note,
        formatFunction
    ],
    sheet,
    rowIndex,
    columnIndex
) => {
    const range = sheet.getRange(
        rowIndex,
        columnIndex
    ).setValue(value)

    if (note) {
        range.setNote(note)
    }

    if (formatFunction) {
        formatFunction(range)
    }
}

const populateColumnHeaderCell = (
    args,
    sheet,
    isVertical,
    currentColumnIndex,
    headerIndex,
    rowIndexAfterTableHeader
) => populateColumnHeaderCellImpl(
    args,
    sheet,
    isVertical
        ? currentColumnIndex
        : rowIndexAfterTableHeader + headerIndex,
    isVertical
        ? headerIndex + 1
        : currentColumnIndex
)

const createTable = ({
    initialRowCount,
    sections,
    tableDescription,
    tableName,
    tableType
},
{
    afterTableName = null,
    deleteIfExists = false,
    updateIfExists = false
}) => {
    const [
        sheet,
        wasInserted
    ] = insertTable(
        tableName,
        deleteIfExists,
        afterTableName
    )

    if (!wasInserted && !updateIfExists) {
        return [sheet, wasInserted]
    }

    const isVertical = (
        TABLE_TYPE.configSingle.is(tableType) ||
        TABLE_TYPE.configMultiple.is(tableType) ||
        TABLE_TYPE.meta.is(tableType)
    )

    const tableHeader = [
        [tableName, formatTableName],
        [tableDescription, null]
    ]

    const columnHeaderSize = isVertical ? 3 : 4

    const rowIndexAfterTableHeader = tableHeader.length + 1

    const rowIndexAtBeginOfTableBody = isVertical
        ? rowIndexAfterTableHeader
        : rowIndexAfterTableHeader + columnHeaderSize

    const rowIndexBeforeTableBody = rowIndexAtBeginOfTableBody - 1

    const existingColumnIds = wasInserted
        ? getColumnIds({
            isVertical,
            rowIndexAtBeginOfTableBody,
            rowIndexAfterTableHeader,
            sheet
        })
        : []

    const minColumnSize = getMinColumnSize({
        existingColumnIds,
        isVertical,
        sections,
        wasInserted
    })

    const minRowSize = isVertical
        ? columnHeaderSize + 1
        : initialRowCount + columnHeaderSize

    const [
        actualRowSize,
        actualColumnSize
    ] = adjustSheetSize(
        sheet,
        minRowSize,
        minColumnSize
    )

    tableHeader.forEach(
        ([value, formatFunction], index) => {
            const range = sheet.getRange(
                1,
                index + 1,
                1,
                isVertical ? minRowSize : minColumnSize
            ).merge()
                .setValue(value)

            if (formatFunction) {
                formatFunction(range)
            }
        }
    )

    let currentColumnIndex = isVertical
        ? rowIndexAfterTableHeader
        : 1

    const decrement = (step = 1) => {
        currentColumnIndex -= step
    }

    const increment = (step = 1) => {
        currentColumnIndex += step
    }

    sections.forEach(({
        columns,
        sectionDescription,
        sectionTitle
    }) => {
        if (isVertical) {
            insertVerticalTitle({
                note: sectionDescription,
                numColumns: columns.length,
                rowIndex: currentColumnIndex,
                sheet,
                title: sectionTitle,
                wasInserted
            })

            increment()
        }

        columns.forEach((column) => {
            let wasColumnInserted = false

            if (!wasInserted) {
                if (
                    isVertical &&
                    isVerticalTitle(currentColumnIndex)
                ) {
                    sheet.deleteRow(currentColumnIndex)
                    decrement()
                }

                const existingColumnIndex = existingColumnIds.indexOf(
                    column.columnId
                )

                if (existingColumnIndex === -1) {
                    if (isVertical) {
                        sheet.insertRows(currentColumnIndex)
                    } else {
                        sheet.insertColumns(currentColumnIndex)
                    }

                    wasColumnInserted = true
                } else if (existingColumnIndex !== currentColumnIndex) {
                    if (isVertical) {
                        sheet.insertRows(currentColumnIndex)
                        sheet.getRange(
                            existingColumnIndex,
                            1,
                            1,
                            sheet.getLastColumn()
                        ).moveTo(
                            sheet.getRange(
                                currentColumnIndex,
                                1
                            )
                        )
                    } else {
                        sheet.insertColumn(currentColumnIndex)
                        sheet.getRange(
                            1,
                            existingColumnIndex,
                            sheet.getLastRow(),
                            1
                        ).moveTo(
                            sheet.getRange(
                                currentColumnIndex,
                                1
                            )
                        )
                    }
                }
            }

            const {
                columnType,
                dataType,
                getValidValueRange = null,
                validations,
                validValues = [],
                value2ColorPairs = []
            } = column

            const columnHeader = makeColumnHeader(
                column,
                sectionTitle,
                isVertical
            )

            columnHeader.forEach((args, headerIndex) => {
                populateColumnHeaderCell(
                    args,
                    sheet,
                    isVertical,
                    currentColumnIndex,
                    headerIndex,
                    rowIndexAfterTableHeader
                )
            })

            const [
                columnBodyRange,
                columnHeaderRange
            ] = getColumnRanges({
                actualColumnSize,
                actualRowSize,
                columnHeaderSize,
                currentColumnIndex,
                isVertical,
                rowIndexAtBeginOfTableBody,
                rowIndexBeforeTableBody,
                sheet
            })

            formatColumn({
                columnBodyRange,
                columnHeaderRange,
                columnType,
                dataType,
                isVertical,
                sheet,
                value2ColorPairs
            })

            applySheetValidation(
                columnBodyRange,
                dataType,
                validations,
                getValidValueRange
                    ? getValidValueRange(rowIndexAtBeginOfTableBody)
                    : validValues
            )

            if (wasInserted || wasColumnInserted) {
                sheet.autoResizeColumns(
                    isVertical ? 1 : currentColumnIndex,
                    isVertical ? columnHeaderSize : 1
                )
            }

            increment()
        })
    })

    if (!wasInserted) {
        adjustColumnSize(
            sheet,
            minColumnSize
        )
    }

    if (isVertical) {
        // sheet.hideColumn(sheet.getRange(1, 1))
        sheet.setFrozenColumns(columnHeaderSize)
    } else {
        // sheet.hideRow(sheet.getRange(1, 1))
        sheet.setFrozenRows(rowIndexBeforeTableBody)
    }

    sheet.protect()
        .setWarningOnly(true)
        .setDescription(
            `For safer validation, it is recommended to use the dedicated
 data entry and manipulation forms selectable via the '${UI_TITLE}' menu.
 Feel free to ignore, if you are confident in what you are doing.`
        )

    return [sheet, wasInserted]
}

export {
    createTable as default,
    AS_FIRST_TABLE
}
