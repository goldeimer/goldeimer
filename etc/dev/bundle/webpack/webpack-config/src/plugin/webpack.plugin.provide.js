const webpack = require('webpack')

module.exports = () => new webpack.ProvidePlugin({
    Buffer: ['buffer', 'Buffer'],
    process: 'process/browser'
})
