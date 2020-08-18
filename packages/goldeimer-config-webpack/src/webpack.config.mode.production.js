const merge = require('webpack-merge')

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(require('./webpack.config.base.js'), {
    mode: 'production',
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({}),
            new TerserPlugin({})
        ]
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: 'bundle-analyzer.html'
        })
    ],
    devtool: 'source-map'
})
