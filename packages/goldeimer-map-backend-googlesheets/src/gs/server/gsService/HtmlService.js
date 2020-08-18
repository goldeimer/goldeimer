/* eslint-disable no-undef */
const createHtmlOutputFromFile = (
    fileName = 'index'
) => HtmlService.createHtmlOutputFromFile(fileName)

// for usage in templated markup
const include = (filename) => (
    createHtmlOutputFromFile(filename).getContent()
)
/* eslint-enable no-undef */

export {
    createHtmlOutputFromFile,
    include
}
