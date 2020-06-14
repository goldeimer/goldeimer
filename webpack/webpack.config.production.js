const merge = require('webpack-merge')

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')

const { BundleAnalyzerPlugin } = require(
    'webpack-bundle-analyzer'
)

const productionModeConfig = merge(
    require('./webpack.config.base.js'),
    {
        mode: 'production',
        optimization: {
            minimizer: [
                new OptimizeCSSAssetsPlugin({}),
                new TerserJSPlugin({})
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
    }
)

module.exports = productionModeConfig
