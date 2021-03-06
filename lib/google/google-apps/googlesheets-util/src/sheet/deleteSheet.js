import getActiveSpreadsheet from '@gs/sheet/getActiveSpreadsheet'

const deleteSheet = (sheet) => {
    getActiveSpreadsheet().deleteSheet(sheet)
}

export default deleteSheet
