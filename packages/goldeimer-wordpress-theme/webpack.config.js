const merge = require('webpack-merge')
const path = require('path')

const {
    newCopyPlugin,
    withBaseConfig
} = require('@goldeimer-config/webpack')

const SRC = path.resolve(__dirname, 'src')
const SRC_JS = path.resolve(SRC, 'js')

module.exports = withBaseConfig({
    name: '@goldeimer/wordpress-theme',
    entry: {
        'map': path.resolve(
            SRC_JS,
            'EntryWordPressMerchantMap.jsx'
        ),
        'toilet-paper-calculator': path.resolve(
            SRC_JS,
            'EntryWordPressToiletPaperCalculator.jsx'
        ),
        'style': path.resolve(
            SRC,
            'css',
            'wordpress-main.css'
        )
    },
    output: {
        filename: 'static/js/[name].[contenthash].js',
        path: 'build/wordpress-theme',
        publicPath: '/wp-content/themes/enfold-child/'
    },
    plugins: [
        newCopyPlugin({
            from: path.resolve(SRC, 'php')
        })
    ]
})
