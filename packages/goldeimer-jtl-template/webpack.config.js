const merge = require('webpack-merge')
const path = require('path')

const {
    newCopyPlugin,
    withBaseConfig
} = require('@goldeimer-config/webpack')

const SRC = path.resolve(__dirname, 'src')

module.exports = withBaseConfig({
    name: '@goldeimer/jtl-template',
    entry: {
        'jtl-template': path.resolve(
            SRC,
            'js',
            'index.js'
        )
    },
    output: {
        filename: 'static/js/[name].[contenthash].js',
        publicPath: '/'
    },
    plugins: [
        newCopyPlugin({
            from: path.resolve(SRC, 'php')
        })
    ]
})
