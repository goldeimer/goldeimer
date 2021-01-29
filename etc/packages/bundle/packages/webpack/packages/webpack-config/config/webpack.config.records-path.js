const path = require('path')

const makeOutputPath = require('../util/makeOutputPath')

module.exports = ({
    mode,
    ...args
}) => path.join(
    makeOutputPath(args),
    `artifacts/records.${mode}.json`
)
