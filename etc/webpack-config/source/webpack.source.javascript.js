const { merge } = require('webpack-merge')

// TODO(Johannes):
// Linting errors make the build fail with error code 2 (expected),
// but do not generate console output telling the user
// what caused the error (unexpected).
//
// const ESLintPlugin = require('eslint-webpack-plugin')

const { JAVASCRIPT, NODE_MODULES } = require('../enum/WebpackRuleTest')
const resolveBabelConfigFile = require('../util/resolveBabelConfigFile')

module.exports = (options = {}) => {
    const babelLoaderOptions = options.babelLoader || {}

    return {
        module: {
            rules: [{
                test: JAVASCRIPT,
                exclude: NODE_MODULES,
                use: [{
                    // run transpilation in multiple threads
                    loader: require.resolve('thread-loader'),
                    options: options.threadLoader || {}
                }, {
                    // transpile JS
                    loader: require.resolve('babel-loader'),
                    options: merge(options.babelLoader || {}, {
                        cacheDirectory: true,
                        compact: true,
                        extends: (
                            babelLoaderOptions.extends
                            || babelLoaderOptions.configFile
                            || resolveBabelConfigFile(
                                options.context,
                                options.mode
                            )
                        ),
                        presets: ['@goldeimer'],
                        rootMode: 'upward'
                    })
                }]
                // TODO: Measure perf impact in production.
                // *Might* have mitigated a layout glitch
                // on both main vendor's phones.
                // Also might not be the most light-weight solution.
                // Definitely very runtime-centric.
                // 'astroturf/loader']
            }]
        },
        plugins: [
            // new ESLintPlugin(
            //     merge(options.eslintPlugin || {}, {
            //         emitError: true,
            //         emitWarning: true,
            //         fix: true,
            //         failOnError: true,
            //         failOnWarning: false
            //     })
            // )
        ]
    }
}
