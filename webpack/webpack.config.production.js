const merge = require('webpack-merge')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
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
            }),
            new CleanWebpackPlugin()
        ],
        devtool: 'source-map'
    }
)

module.exports = productionModeConfig
