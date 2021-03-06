const {
    newWebpackConfigBuilder
} = require('@goldeimer/webpack-config')

const builder = newWebpackConfigBuilder(__dirname)

module.exports = (...args) => builder.build(...args)
