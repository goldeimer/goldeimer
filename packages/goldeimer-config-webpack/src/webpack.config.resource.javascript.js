const { BuildMode } = require('./BuildMode')
const { DebugMode, isDebugModeEnabled } = require('./DebugMode')
const { JAVASCRIPT, NODE_MODULES } = require('./FileExtensionTest')

module.exports = ({
    BUILD_MODE = BuildMode.PRODUCTION,
    DEBUG_MODE = DebugMode.DISABLED
}) => ({
    module: {
        rules: [{
            test: JAVASCRIPT,
            exclude: NODE_MODULES,
            use: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    rootMode: 'upward'
                }
            },
            // TODO: Measure perf impact in production.
            // *Might* have mitigated a layout glitch on both vendor's phones.
            // Also might not be the most light-weight solution.
            // Definitely very runtime-centric.
            'astroturf/loader']
        }, {
            test: JAVASCRIPT,
            exclude: NODE_MODULES,
            enforce: 'pre',
            use: [{
                loader: 'eslint-loader',
                options: {
                    fix: true,
                    failOnError: true,
                    failOnWarning: (
                        BUILD_MODE === BuildMode.PRODUCTION
                        && !isDebugModeEnabled(DEBUG_MODE)
                    )
                }
            }]
        }]
    }
})
