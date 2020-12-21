const os = require('os')

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const { isUmdBuild } = require('@goldeimer/build-util')

const isDevelopmentMode = require('../util/isDevelopmentMode')
const isEsmBuild = require('../util/isEsmBuild')

const getIdAlgorithm = (devMode) => (
    devMode
        ? 'named'
        : 'deterministic'
)

const getIdAlgorithms = (devMode) => {
    const idAlgorithm = getIdAlgorithm(devMode)

    return {
        chunkIds: idAlgorithm,
        moduleIds: idAlgorithm
    }
}

const minimizer = ({ esmBuild = false }) => {
    const parallelThreads = os.cpus().length - 1

    return [
        new CssMinimizerPlugin({
            minimizerOptions: {
                preset: ['default', {
                    discardComments: { removeAll: true }
                }]
            },
            parallel: parallelThreads,
            sourceMap: { inline: false }
        }),
        new TerserPlugin({
            parallel: parallelThreads,
            terserOptions: {
                ecma: esmBuild ? 2015 : 5,
                module: esmBuild
            }
        })
    ]
}

module.exports = ({
    buildTarget,
    isLibrary,
    mode
}) => {
    const devMode = isDevelopmentMode(mode)
    const esmBuild = isEsmBuild(buildTarget)
    const umdBuild = isUmdBuild(buildTarget)

    return {
        ...getIdAlgorithms(devMode),
        mangleWasmImports: !devMode,
        minimize: !devMode,
        minimizer: minimizer({ esmBuild }),
        runtimeChunk: !isLibrary,
        splitChunks: {
            automaticNameDelimiter: '.',
            chunks: 'initial',
            enforceSizeThreshold: 1e6,
            maxAsyncRequests: 30,
            maxAsyncSize: 2e6,
            maxInitialRequests: 30,
            maxInitialSize: 1e6,
            maxSize: 3e6,
            minChunks: 1,
            minSize: 1e5,
            ...(devMode ? {} : { name: false }),
            ...(umdBuild
                ? {
                    cacheGroups: {
                        default: false
                    }
                }
                : {})
        },
        usedExports: true
    }
}
