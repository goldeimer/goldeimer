const path = require('path')
const webpack = require('webpack')

const { BundleStatsWebpackPlugin: BundleStatsPlugin } = require('bundle-stats-webpack-plugin')
const { CleanWebpackPlugin: CleanPlugin } = require('clean-webpack-plugin')
const DotenvPlugin = require('dotenv-webpack')
const ManifestPlugin = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { NODE_MODULES } = require('./FileExtensionTest')
const { PROJECT_ROOT } = require('../../../abspath')

module.exports = {
    context: PROJECT_ROOT,
    resolve: require('./webpack.config.base.resolve'),
    target: 'web',
    plugins: [
        new webpack.ProgressPlugin(),
        new CleanPlugin({
            cleanAfterEveryBuildPatterns: [],
            cleanOnceBeforeBuildPatterns: ['**/*'],
            // With `cleanStaleWebpackAssets` set to true, the plugin
            // unfortunately removes too many files on subsequent emitting
            // to the same directory.
            // Likely related to bundle-stats-webpack-plugin emitting its
            // results and/or to using multi-compiler mode.
            //
            // TODO: Investigate. Fix. Reactivate.
            cleanStaleWebpackAssets: false
        }),
        new BundleStatsPlugin({
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
                orphanModuleresourceConfigStaticAssetss: true,
                providedExports: true,
                usedExports: true
            }
        }),
        new ManifestPlugin(),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].css',
            chunkFilename: 'static/css/[id].css'
        }),
        new DotenvPlugin({
            allowEmptyValues: false,
            defaults: '.env.defaults',
            expand: true,
            path: path.resolve(
                PROJECT_ROOT,
                './.env'
            ),
            safe: true,
            systemvars: false,
            root: true,
            silent: false
        })
    ],
    optimization: {
        moduleIds: 'hashed',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: NODE_MODULES,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        usedExports: true
    },
    recordsPath: path.resolve(
        PROJECT_ROOT,
        'records.json'
    ),
    watchOptions: {
        ignored: NODE_MODULES
    }
}
