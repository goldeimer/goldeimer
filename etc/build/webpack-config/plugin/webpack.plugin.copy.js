const CopyPlugin = require('copy-webpack-plugin')

module.exports = (...patterns) => new CopyPlugin({
    patterns: patterns.map((pattern) => ({
        ...pattern,
        transform: (content, absoluteFrom) => {
            // user transforms
            const _content = pattern.transform
                ? pattern.transform(content, absoluteFrom)
                : content

            // common transforms
            return _content
        }
    }))
})
