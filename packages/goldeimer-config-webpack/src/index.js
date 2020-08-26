const path = require('path')
const merge = require('webpack-merge')

const { BUILD_DIR } = require('../../../abspath')

const { BuildMode, buildModeConfig } = require('./BuildMode')
const { DebugMode } = require('./DebugMode')
const resourceConfigJavascript = require('./webpack.config.resource.javascript')

// const resourceConfigTypeScript = require('./webpack.config.resource.typescript')

const outputAbspath = ({
    output: {
        relPath = '',
        ...outputArgs
    },
    ...packageConfig
}) => ({
    ...packageConfig,
    output: {
        ...outputArgs,
        path: path.resolve(
            BUILD_DIR,
            relPath
        )
    }
})

module.exports = {
    newCopyPlugin: require('./webpack.config.plugin.copy'),
    newDefinePlugin: require('./webpack.config.plugin.define'),
    newHtmlPlugin: require('./webpack.config.plugin.html'),
    withBaseConfig: (
        packageConfig = {}
    ) => ({
        BUILD_MODE = BuildMode.PRODUCTION,
        DEBUG_MODE = DebugMode.DISABLED
    } = {}) => merge(
        require('./webpack.config.base'),
        resourceConfigJavascript({
            BUILD_MODE,
            DEBUG_MODE
        }),
        require('./webpack.config.resource.static-assets'),
        require('./webpack.config.resource.style'),
        buildModeConfig(BUILD_MODE),
        outputAbspath(packageConfig)
    )
}
