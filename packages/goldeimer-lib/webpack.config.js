const path = require('path')

const {
    newCopyPlugin,
    newHtmlPlugin,
    withBaseConfig
} = require('@goldeimer-config/webpack')

const packageConfig = require('./package.json')

const SRC = path.resolve(__dirname, 'src')

module.exports = withBaseConfig({
    name: '@goldeimer/lib',
    entry: {
        index: path.resolve(
            SRC,
            'js',
            'index.js'
        )
    },
    output: {
        filename: 'index.js',
        library: packageConfig.name,
        libraryTarget: 'umd',
        path: path.resolve(
            __dirname,
            'dist'
        )
    },
    resolve: {

    }
})
