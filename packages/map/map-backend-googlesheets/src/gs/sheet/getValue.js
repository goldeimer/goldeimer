import {
    getActiveSheet
} from '@gs/sheet/getSheet'

const getRowValues = ({
    rowIndex,
    sheet = getActiveSheet()
}) => sheet.getRange(`${rowIndex}:${rowIndex}`)
    .getValues()[0]

const isRowEmpty = ({
    rowIndex,
    sheet = getActiveSheet()
}) => (
    getRowValues({ rowIndex, sheet }).filter(
        (value) => value !== ''
    ).length < 1
)

export {
    getRowValues,
    isRowEmpty
}
