const { isJavaScript } = require('../condition')
const { IS_DEVELOPMENT_BUILD } = require('../env')

const esLintLoader = {
    test: isJavaScript,
    exclude: /node_modules/,
    enforce: 'pre',
    loader: 'eslint-loader',
    options: {
        fix: true,
        failOnError: true,
        failOnWarning: false //!IS_DEVELOPMENT_BUILD
    },
}

module.exports = esLintLoader
