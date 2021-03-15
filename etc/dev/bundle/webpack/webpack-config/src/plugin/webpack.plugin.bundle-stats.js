const { BundleStatsWebpackPlugin: BundleStatsPlugin } = require('bundle-stats-webpack-plugin')

module.exports = ({
    mode,
    options = {}
} = {}) => new BundleStatsPlugin({
    ...options
})
