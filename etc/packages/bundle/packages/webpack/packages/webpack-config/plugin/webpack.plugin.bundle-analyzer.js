const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = ({
    mode,
    options = {}
} = {}) => new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false,
    reportFilename: `artifacts/bundle-analyzer.${mode}.html`,
    ...options
})
