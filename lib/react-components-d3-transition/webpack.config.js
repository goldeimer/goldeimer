const {
    newWebpackConfigBuilder,
    SourceType
} = require('@goldeimer/webpack-config')

const configBuilder = newWebpackConfigBuilder(__dirname)

configBuilder.isLibrary()
configBuilder.loadSource(SourceType.JAVASCRIPT)

module.exports = (...args) => configBuilder.build(...args)
