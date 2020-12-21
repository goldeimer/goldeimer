const { merge } = require('webpack-merge')

const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin')
const ForkTsCheckerNotifierPlugin = require('fork-ts-checker-notifier-webpack-plugin')

const {
    NODE_MODULES,
    TYPESCRIPT
} = require('../enum/WebpackRuleTest')

module.exports = ({
    configFile,
    loader = {},
    forkTsChecher = {},
    forkTsChecherNotifier = {}
}) => ({
    module: {
        rules: [{
            test: TYPESCRIPT,
            exclude: NODE_MODULES,
            use: [{
                loader: 'ts-loader',
                options: merge(loader, {
                    configFile,
                    transpileOnly: true
                })
            }]
        }]
    },
    plugins: [
        new ForkTsCheckerPlugin(merge(forkTsChecher, {
            eslint: {
                files: `**/*.{ts,tsx}`
            },
            formatter: 'basic',
            logger: {
                infrastructure: 'webpack-infrastructure',
                issues: 'console'
            },
            typescript: {
                diagnosticOptions: {
                    declaration: true,
                    global: true,
                    semantic: true,
                    syntactic: true
                },
                issues: {
                    scope: 'all' // vs. 'webpack'
                },
                mode: 'write-tsbuildinfo'
            }
        })),
        new ForkTsCheckerNotifierPlugin(merge(forkTsChecherNotifier, {
            alwaysNotify: false,
            excludeWarnings: false,
            skipFirstNotification: true,
            skipSuccessful: true,
            title: 'TsTest'
        }))
    ]
})
