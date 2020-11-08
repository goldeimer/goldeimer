import getActiveSpreadsheet from '@gs/sheet/getActiveSpreadsheet'

const getActiveSheet = () => getActiveSpreadsheet().getActiveSheet()

const getSheetCount = () => getSheets().length

const getSheetIndexAfterName = (
    name
) => getActiveSpreadsheet().getSheets().findIndex(
    (sheet) => sheet.getName() === name
)

const getSheetName = (
    sheet = getActiveSheet()
) => sheet.getName()

const getSheetByName = (name) => (
    getActiveSpreadsheet().getSheetByName(name)
)

const getSheets = () => getActiveSpreadsheet().getSheets()

export {
    getActiveSheet,
    getSheetCount,
    getSheetIndexAfterName,
    getSheetName,
    getSheetByName,
    getSheets
}
