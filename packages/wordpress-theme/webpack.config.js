const {
    newWebpackConfigBuilder,
    SourceType
} = require('@goldeimer/webpack-config')

const builder = newWebpackConfigBuilder(__dirname)

builder.loadSource(SourceType.FONT)
builder.loadSource(SourceType.JAVASCRIPT)
builder.loadSource(SourceType.STYLESHEET)

builder.publicPath('/wp-content/themes/enfold-child/')

builder.copy({
    from: 'src/php'
})

module.exports = (...args) => builder.build(...args)
