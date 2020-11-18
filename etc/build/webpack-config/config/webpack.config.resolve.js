const DirectoryNamedPlugin = require('directory-named-webpack-plugin')

const makeFields = (
    aliasFields,
    mainFields
) => ({
    aliasFields,
    mainFields
})

const getFields = (target) => {
    if (['browserslist', 'web'].includes(target)) {
        return makeFields(
            ['browser'],
            ['browser', 'main', 'module']
        )
    }

    return makeFields([], ['main', 'module'])
}

module.exports = ({
    target = 'browserslist'
} = {}) => ({
    ...getFields(target),
    cacheWithContext: false,
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    fallback: {
        stream: require.resolve('stream-browserify')
    },
    modules: ['node_modules'],
    plugins: [new DirectoryNamedPlugin()],
    symlinks: false
})
