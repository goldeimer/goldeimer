const DirectoryNamedPlugin = require('directory-named-webpack-plugin')

const makeFields = (
    aliasFields,
    mainFields
) => ({
    aliasFields,
    mainFields
})

const getFields = (target) => {
    if ([
        'web',
        'webworker'
    ].includes(target)) {
        return makeFields(
            ['browser'],
            ['browser', 'module', 'main']
        )
    }

    return makeFields([], ['module', 'main'])
}

module.exports = ({
    target = 'browserslist'
} = {}) => ({
    ...getFields(target),
    cacheWithContext: false,
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    fallback: {
        crypto: require.resolve('crypto-browserify'),
        fs: false,
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        net: false,
        stream: require.resolve('stream-browserify'),
        tty: require.resolve('tty-browserify'),
        zlib: require.resolve('browserify-zlib')
    },
    modules: ['node_modules'],
    plugins: [new DirectoryNamedPlugin()],
    symlinks: false
})
