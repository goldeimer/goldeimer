const path = require('path')

const webpack = require('webpack')
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
    },
}
