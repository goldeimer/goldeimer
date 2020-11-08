const path = require('path')

const GasPlugin = require('gas-webpack-plugin')
const HtmlInlineSourcePlugin = require('html-webpack-inline-source-plugin')

const {
    newCopyPlugin,
    newHtmlPlugin,
    withBaseConfig
} = require('@goldeimer/webpack-config')

const DIST = path.resolve(__dirname, 'dist')
const SRC = path.resolve(__dirname, 'src')
const SRC_GS = path.resolve(SRC, 'gs')

const gsAdminConfig = withBaseConfig({
    name: '@goldeimer/map/map-backend-googlesheets.client',
    entry: {
        client: path.resolve(
            SRC_GS,
            'client'
        )
    },
    output: {
        filename: '[name]/[name].js',
        path: DIST,
        publicPath: '/'
    },
    plugins: [
        newHtmlPlugin({
            appMountId: 'app-mount',
            base: {
                target: '_top'
            },
            inlineSource: '^[^(//)]+.(js|css)$',
            template: path.resolve(
                SRC,
                'ejs',
                'html-plugin-template.ejs'
            )
        }),
        new HtmlInlineSourcePlugin(HtmlPlugin)
    ],
    optimization: {
        runtimeChunk: false,
        splitChunks: false
    },
    // TODO:
    // Sourcemap comment shot the generated markup
    // as interpreted by google apps script.
    // Fix. Re-enable.
    devtool: false
})

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
