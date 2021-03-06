import {
    getActiveSheet
} from '@gs/sheet/getSheet'

const getMaxRows = (
    sheet = getActiveSheet()
) => sheet.getMaxRows()

const getRowIndexAtBeginOfTableBody = (
    sheet = getActiveSheet()
) => sheet.getFrozenRows() + 1

export {
    getMaxRows,
    getRowIndexAtBeginOfTableBody
}
