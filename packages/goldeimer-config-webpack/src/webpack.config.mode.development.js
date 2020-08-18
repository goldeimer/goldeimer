const merge = require('webpack-merge')

module.exports = merge(require('./webpack.config.base.js'), {
    mode: 'development',
    watch: true,
    devtool: 'eval-cheap-module-source-map'
})
