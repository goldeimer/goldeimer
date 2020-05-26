const merge = require('webpack-merge')

const WEBPACK_MODE = 'development'

const webpackModeConfig = merge(
    require('./webpack.config.base.js'),
    {
        mode: WEBPACK_MODE,
        watch: true,
        devtool: 'inline-source-map',
    }
)

module.exports = webpackModeConfig
