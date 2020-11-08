const path = require('path')

const {
    withBaseConfig
} = require('@goldeimer/webpack-config')

module.exports = withBaseConfig({
    entry: './src/template-engine'
}, __dirname)
