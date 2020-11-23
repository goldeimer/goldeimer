const babel = require('./eslintrc.babel')
const core = require('./eslintrc.core')
// const ejs = require('./eslintrc.ejs')
const googleappsscript = require('./eslintrc.googleappsscript')
const react = require('./eslintrc.react')
const rollup = require('./eslintrc.rollup')
// const typescript = require('./eslintrc.typescript')
const webpack = require('./eslintrc.webpack')

module.exports = {
    deprecatedRules: [],
    rules: [],
    configs: {
        all: {
            extends: [
                'plugin:@goldeimer/core',
                'plugin:@goldeimer/babel',
                // plugin:@goldeimer/ejs',
                'plugin:@goldeimer/googleappsscript',
                'plugin:@goldeimer/react',
                'plugin:@goldeimer/rollup',
                // 'plugin:@goldeimer/typescript',
                'plugin:@goldeimer/webpack'
            ]
        },
        core,
        babel,
        // ejs,
        googleappsscript,
        react,
        rollup,
        // typescript,
        webpack
    }
}
