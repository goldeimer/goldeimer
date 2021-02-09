const webpack = require('webpack')

const {
    isUmdBuild,
    BuildTarget
} = require('@goldeimer/compile-util')

const WebpackMode = require('../enum/WebpackMode')

const config = {
    devtool: require('./webpack.config.devtool'),
    entry: require('./webpack.config.entry'),
    experiments: require('./webpack.config.experiments'),
    externals: require('./webpack.config.externals'),
    optimization: require('./webpack.config.optimization'),
    output: require('./webpack.config.output'),
    performance: require('./webpack.config.performance'),
    recordsPath: require('./webpack.config.records-path'),
    resolve: require('./webpack.config.resolve'),
    target: require('./webpack.config.target')
}

module.exports = {
    ...config,
    baseConfig: ({
        buildTarget = BuildTarget.CJS,
        context,
        entries = [],
        externals = [],
        externalsWhitelist = [],
        isLibrary,
        libraryTarget,
        mode = WebpackMode.PRODUCTION,
        nodeExternalsEnabled = false,
        outputPath,
        pkgInfo,
        publicPath,
        sourceMap,
        treatPeerDepsAsExternals = true
    }) => ({
        name: pkgInfo.names.scopedName,
        devtool: config.devtool({ mode, sourceMap }),
        entry: config.entry({
            context,
            entries,
            pkgInfo
        }),
        experiments: config.experiments({ buildTarget }),
        externals: config.externals({
            externals,
            externalsWhitelist,
            nodeExternalsEnabled,
            pkgInfo,
            treatPeerDepsAsExternals
        }),
        optimization: config.optimization({
            buildTarget,
            isLibrary,
            mode
        }),
        output: config.output({
            buildTarget,
            context,
            isLibrary,
            libraryTarget,
            mode,
            outputPath,
            pkgInfo,
            publicPath
        }),
        performance: config.performance(mode),
        recordsPath: config.recordsPath({
            buildTarget,
            context,
            mode,
            outputPath
        }),
        resolve: config.resolve(),
        stats: {
            errors: true,
            errorDetails: true
        },
        target: config.target(buildTarget),
        plugins: isUmdBuild(buildTarget)
            ? [new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })]
            : []
    })
}
