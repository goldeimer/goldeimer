const merge = require('webpack-merge')

const developmentModeConfig = merge(
    require('./webpack.config.base.js'),
    {
        mode: 'development',
        watch: true,
        watchOptions: {
            ignored: /node_modules/
        },
        devtool: 'eval-cheap-module-source-map'
    }
)

module.exports = developmentModeConfig
