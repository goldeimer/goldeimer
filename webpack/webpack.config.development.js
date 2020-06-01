const merge = require('webpack-merge')

const WEBPACK_MODE = 'development'

const webpackModeConfig = merge(
    require('./webpack.config.base.js'),
    {
        mode: WEBPACK_MODE,
        watch: true,
        watchOptions: {
            ignored: /[\\/]node_modules[\\/]/
        },
        devtool: 'eval-cheap-module-source-map',
    }
)

module.exports = webpackModeConfig
