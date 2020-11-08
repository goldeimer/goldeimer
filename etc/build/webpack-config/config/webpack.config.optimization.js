const os = require('os');
const { merge } = require('webpack-merge')

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const isDevelopmentMode = require('../util/isDevelopmentMode')
const isEsmBuild = require('../util/isEsmBuild')
const isUmdBuild = require('../util/isUmdBuild')

const PARALLEL_THREAD_COUNT = os.cpus().length - 1

const getIdAlgorithm = (_isDevelopmentMode) => _isDevelopmentMode
    ? 'named'
    : 'deterministic'

const getIdAlgorithms = (_isDevelopmentMode) => {
    const idAlgorithm = getIdAlgorithm(_isDevelopmentMode)

    return {
        chunkIds: idAlgorithm,
        moduleIds: idAlgorithm
    }
}

const minimize = ({
    _isDevelopmentMode,
    _isEsmBuild,
    isLibrary
}) => (
    !_isDevelopmentMode
    && (
        !_isEsmBuild
        || !isLibrary
    )
)

const minimizer = () => ([
    new CssMinimizerPlugin({
        minimizerOptions: {
            preset: ['default', {
                discardComments: { removeAll: true },
            }],
        },
        parallel: PARALLEL_THREAD_COUNT,
        sourceMap: { inline: false }
    }),
    new TerserPlugin({
        parallel: PARALLEL_THREAD_COUNT
    })
])

const paramBasedOptimization = ({
    _isDevelopmentMode,
    ...args
}) => {
    if (_isDevelopmentMode) {
        return getIdAlgorithms(_isDevelopmentMode)
    }

    return {
        ...getIdAlgorithms(_isDevelopmentMode),
        mangleWasmImports: true,
        minimize: minimize({
            ...args,
            _isDevelopmentMode
        }),
        splitChunks: {
            name: false
        }
    }
}

module.exports = ({
    buildTarget,
    isLibrary,
    mode
}) => {
    const _isUmdBuild = isUmdBuild(buildTarget)

    return merge(
        paramBasedOptimization({
            _isDevelopmentMode: isDevelopmentMode(mode),
            _isEsmBuild: isEsmBuild(buildTarget),
            isLibrary
        }), {
            minimizer: minimizer(),
            runtimeChunk: !_isUmdBuild,
            splitChunks: {
                automaticNameDelimiter: '-',
                chunks: 'all',
                enforceSizeThreshold: 1e6,
                maxAsyncRequests: 30,
                maxAsyncSize: 2e6,
                maxInitialRequests: 30,
                maxInitialSize: 1e6,
                maxSize: 3e6,
                minChunks: 1,
                minSize: 1e5,
                ...(_isUmdBuild
                    ? {
                        cacheGroups: { default: false }
                    }
                    : {}
                )
            },
            usedExports: true
        }
    )
}
