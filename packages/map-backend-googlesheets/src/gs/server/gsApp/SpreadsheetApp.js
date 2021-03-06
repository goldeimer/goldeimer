/* eslint-disable no-undef */
const getUi = () => SpreadsheetApp.getUi()

const getActiveSpreadsheet = () => SpreadsheetApp.getActiveSpreadsheet()

const newConditionalFormatRule = () => SpreadsheetApp.newConditionalFormatRule()

const newDataValidation = () => SpreadsheetApp.newDataValidation()
/* eslint-enable no-undef */

export {
    getActiveSpreadsheet,
    getUi,
    newConditionalFormatRule,
    newDataValidation
}
