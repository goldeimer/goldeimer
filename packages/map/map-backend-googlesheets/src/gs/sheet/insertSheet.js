import getActiveSpreadsheet from '@gs/sheet/getActiveSpreadsheet'

const insertSheet = (
    name,
    index = null
) => (
    getActiveSpreadsheet().insertSheet(
        name,
        index
    )
)

export default insertSheet
