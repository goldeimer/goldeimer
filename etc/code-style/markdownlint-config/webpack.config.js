const path = require('path')

const {
    newCopyPlugin,
    withBaseConfig
} = require('@goldeimer/webpack-config')

const DIST = path.resolve(__dirname, 'dist')
const SRC = path.resolve(__dirname, 'src')

module.exports = withBaseConfig({
    entry: './src/markdown-lint',
    output: {
        path: DIST
    }
})
