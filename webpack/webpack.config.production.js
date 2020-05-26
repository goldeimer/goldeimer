const merge = require('webpack-merge')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')

const WEBPACK_MODE = 'production'

const webpackModeConfig = merge(
    require('./webpack.config.base.js'),
    {
        mode: WEBPACK_MODE,
        optimization: {
            minimizer: [
                new OptimizeCSSAssetsPlugin({}),
                new TerserJSPlugin({}),
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
        ],
        devtool: 'source-map',
    }
)

module.exports = webpackModeConfig
