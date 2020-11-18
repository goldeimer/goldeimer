const {
    newWebpackConfigBuilder,
    SourceType
} = require('@goldeimer/webpack-config')

const builder = newWebpackConfigBuilder(__dirname)

builder.loadSource(SourceType.JAVASCRIPT)

builder.setIsLibrary()

module.exports = (...args) => builder.build(...args)
