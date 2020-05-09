const merge = require('webpack-merge');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = merge(
    require('./webpack.config.base.js'),
    {
        mode: 'production',
        optimization: {
            minimizer: [
                new OptimizeCSSAssetsPlugin({}),
                new TerserJSPlugin({}),
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
        ],
    }
)
