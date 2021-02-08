const WebpackConfigBuilder = require('./WebpackConfigBuilder')

module.exports = (
    context,
    options = {}
) => new WebpackConfigBuilder(context, options)
