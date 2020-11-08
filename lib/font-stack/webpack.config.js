const {
    newWebpackConfigBuilder,
    SourceType
} = require('@goldeimer/webpack-config')

const configBuilder = newWebpackConfigBuilder(__dirname)

configBuilder.isLibrary()

configBuilder.loadSource(SourceType.FONT)
configBuilder.loadSource(SourceType.JAVASCRIPT)
configBuilder.loadSource(SourceType.STYLESHEET)

configBuilder.defaultEntry(false)
configBuilder.entry(
    'museo',
    './src/Veneer/VeneerOne.js'
)

module.exports = (...args) => configBuilder.build(...args)
