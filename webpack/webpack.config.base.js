const path = require('path')

const webpack = require('webpack')
const BundleAnalyzerPlugin = require(
    'webpack-bundle-analyzer'
).BundleAnalyzerPlugin
const { BundleStatsWebpackPlugin } = require('bundle-stats-webpack-plugin')
const ManifestWebpackPlugin = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const babelLoader = require('./babelLoader')
const eslintLoader = require('./eslintLoader')
const fileLoader = require('./fileLoader')
const styleLoader = require('./styleLoader')
const isDevBuild = require('./isDevBuild')
const { SRC_PATH } = require('./path')
const resolve = require('./resolve')

module.exports = {
    context: SRC_PATH,
    target: 'web',
    plugins: [
        new webpack.DefinePlugin({}),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: 'bundle-analyzer.html',
        }),
        new BundleStatsWebpackPlugin({
            baseline: true,
            stats: {
                assets: true,
                assetsSort: '!size',
                builtAt: true,
                chunks: true,
                depth: true,
                entrypoints: true,
                env: true,
                hash: true,
                modules: true,
                modulesSort: '!size',
                orphanModules: true,
                providedExports: true,
                usedExports: true
            }
        }),
        new ManifestWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].css',
            chunkFilename: 'static/css/[id].css',
        }),
    ],
    resolve,
    module: {
        rules: [
            babelLoader,
            eslintLoader,
            styleLoader,
            ...fileLoader
        ],
    },
    optimization: {
        moduleIds: 'hashed',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
        usedExports: true,
    },
}
