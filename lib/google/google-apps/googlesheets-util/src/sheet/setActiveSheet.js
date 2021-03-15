import getActiveSpreadsheet from '@gs/sheet/getActiveSpreadsheet'

import {
    getSheetByName
} from '@gs/sheet/getSheet'

const setActiveSheet = (sheetName) => {
    const sheet = getSheetByName(sheetName)

    if (sheet) {
        getActiveSpreadsheet().setActiveSheet(sheet)
    }
}

export default setActiveSheet
