import getActiveSpreadsheet from '@gs/sheet/getActiveSpreadsheet'

import {
    getActiveSheet
} from '@gs/sheet/getSheet'

const getActiveRange = () => getActiveSpreadsheet().getActiveRange()

const getCell = (
    rowIndex,
    columnIndex
) => getRange({ args: [rowIndex, columnIndex] })
    .getCell(1, 1)

const getCellFromRange = (
    range,
    { row = 1, column = 1 }
) => range.getCell(row, column)

const getRange = ({
    sheet = getActiveSheet(),
    args
}) => sheet.getRange(...args)

export {
    getActiveRange,
    getCell,
    getCellFromRange,
    getRange
}
