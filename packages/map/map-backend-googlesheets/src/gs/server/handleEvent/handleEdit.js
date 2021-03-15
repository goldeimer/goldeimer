import { DATE_FORMAT } from '@gs/config'
import {
    DataType,
    TableType
} from '../enum'
import { TABLE_LOOKUP } from '@gs/schema'

import {
    getUserEmail
} from '@gs/server/gsService'

import {
    dateNow,
    getUuid
} from '@gs/server/gsUtilities'

import {
    getRowIndexAtBeginOfTableBody,
    isRowEmpty
} from '@gs/sheet'

import {
    getCellByColumnId
} from '@gs/record'

const handleRowEdit = ({
    rowIndex,
    sheet
}) => {
    const getCell = (
        columnId
    ) => getCellByColumnId({ columnId, rowIndex, sheet })

    const table = TABLE_LOOKUP[sheet.getName()]

    const setValue = ({
        columnId,
        numberFormat = null,
        overwriteExisting = true,
        value
    }) => {
        const cell = getCell(columnId)

        if (!cell) {
            return
        }

        if (!overwriteExisting && cell.getValue() !== '') {
            return
        }

        cell.setValue(value)

        if (numberFormat) {
            cell.setNumberFormat(numberFormat)
        }
    }

    const setValueIfUnset = (args) => setValue({
        ...args,
        overwriteExisting: false
    })

    if (isRowEmpty({ rowIndex, sheet })) {
        return
    }

    const userEmail = getUserEmail()
    const now = dateNow()

    if (table) {
        if ([
            TableType.Default,
            TableType.Log,
            TableType.Queue
        ].any(
            (tableType) => tableType.is(table.tableType)
        )) {
            setValueIfUnset({
                columnId: 'id',
                value: getUuid()
            })

            setValueIfUnset({
                columnId: 'createdAt',
                numberFormat: DATE_FORMAT,
                value: now
            })

            setValueIfUnset({
                columnId: 'createdBy',
                value: userEmail
            })

            setValue({
                columnId: 'updatedAt',
                numberFormat: DATE_FORMAT,
                value: now
            })

            setValue({
                columnId: 'updatedBy',
                value: userEmail
            })
        }

        const foreignKeyColumns = table.flattenedColumns.filter(
            ({ dataType }) => DataType.ForeignKey.is(dataType)
        )

        foreignKeyColumns.
    }
}

const handleEdit = (event) => {
    const sheet = event.source.getActiveSheet()

    const rowIndexAtBeginOfTableBody = getRowIndexAtBeginOfTableBody(sheet)

    let rowIndex = event.range.getRow()
    const endRowIndex = event.range.getLastRow()
    for (rowIndex; rowIndex <= endRowIndex; rowIndex += 1) {
        if (rowIndex >= rowIndexAtBeginOfTableBody) {
            handleRowEdit({
                rowIndex,
                sheet
            })
        }
    }
}

export {
    handleEdit as default,
    handleRowEdit
}
