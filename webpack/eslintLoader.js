const isDevBuild = require('./isDevBuild')
const { isJavaScriptFile } = require('./condition')

const esLintLoader = {
    test: isJavaScriptFile,
    exclude: /node_modules/,
    enforce: 'pre',
    loader: 'eslint-loader',
    options: {
        eslintPath:
        'eslint-config-airbnb-standard/node_modules/eslint',
        fix: true,
        failOnError: true,
        failOnWarning: !isDevBuild()
    },
}

module.exports = esLintLoader
