import {
    getActiveSheet
} from '@gs/sheet/getSheet'

const getMaxColumns = (
    sheet = getActiveSheet()
) => sheet.getMaxColumns()

export {
    /* eslint-disable-next-line import/prefer-default-export */
    getMaxColumns
}
