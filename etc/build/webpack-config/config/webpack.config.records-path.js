const path = require('path')

const outputPath = require('../util/outputPath')

module.exports = ({
    mode,
    ...args
}) => path.join(
    outputPath(args),
    `artifacts/records.${mode}.json`
)
