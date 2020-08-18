const CopyPlugin = require('copy-webpack-plugin')

module.exports = (...patterns) => new CopyPlugin({
    patterns: patterns.map((pattern) => ({
        ...pattern,
        transform: (content) => content
    }))
})
