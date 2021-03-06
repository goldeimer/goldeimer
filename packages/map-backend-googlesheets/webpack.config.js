const path = require('path')

const {
    newWebpackConfigBuilder,
    SourceType
} = require('@goldeimer/webpack-config')

const DIST = path.resolve(__dirname, 'dist')
const SRC = path.resolve(__dirname, 'src')
const SRC_GS = path.resolve(SRC, 'gs')

const builder = newWebpackConfigBuilder(__dirname)

builder.

const gsServerConfig = withBaseConfig({
    name: '@goldeimer/map/map-backend-googlesheets.server',
    entry: {
        code: path.resolve(
            SRC_GS,
            'server'
        )
    },
    output: {
        filename: '[name]/[name].js',
        libraryTarget: 'this',
        path: DIST
    },
    plugins: [
        newCopyPlugin({
            from: 'appsscript.json'
        }),
        new GasPlugin()
    ],
    optimization: {
        // No `window` object, nor JSONP in GAS on the server side.
        runtimeChunk: false,
        splitChunks: false
    }
})

module.exports = [
    gsAdminConfig,
    gsServerConfig
]
