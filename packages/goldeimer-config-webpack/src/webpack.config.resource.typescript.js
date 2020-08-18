const merge = require('webpack-merge')
const path = require('path')

const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin')
const ForkTsCheckerNotifierPlugin = require('fork-ts-checker-notifier-webpack-plugin')

const { BuildMode } = require('./BuildMode')

const {
    NODE_MODULES,
    TYPE_SCRIPT
} = require('./FileExtensionTest')

module.exports = {
    module: {
        rules: [{
            test: TYPE_SCRIPT,
            exclude: NODE_MODULES,
            use: [{
                loader: 'ts-loader',
                options: {
                    configFile: path.resolve('./tsconfig.json'),
                    transpileOnly: true
                }
            }]
        }]
    },
    output: {
        filename: '[name].js',
        path: '',
        publicPath: '/'
    },
    plugins: [
        new ForkTsCheckerPlugin({
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
        }),
        new ForkTsCheckerNotifierPlugin({
            alwaysNotify: false,
            excludeWarnings: false,
            skipFirstNotification: true,
            skipSuccessful: true,
            title: 'TsTest'
        })
    ],
    optimization: {
        runtimeChunk: false,
        splitChunks: false
    }
}
