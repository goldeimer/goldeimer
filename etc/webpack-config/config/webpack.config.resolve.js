const DirectoryNamedPlugin = require('directory-named-webpack-plugin')

const makeFields = (
    aliasFields,
    importsFields,
    mainFields
) => ({
    aliasFields,
    importsFields,
    mainFields
})

const getFields = (target) => {
    if ([
        'web',
        'webworker'
    ].includes(target)) {
        return makeFields(
            ['browser'],
            ['browser', 'module', 'main'],
            ['browser', 'module', 'main']
        )
    }

    return makeFields([], ['module', 'main'], ['module', 'main'])
}

module.exports = ({
    target = 'browserslist'
} = {}) => ({
    ...getFields(target),
    cacheWithContext: false,
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    fallback: {
        buffer: require.resolve('buffer'),
        crypto: require.resolve('crypto-browserify'),
        fs: false,
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        net: false,
        process: require.resolve('process'),
        stream: require.resolve('stream-browserify'),
        tty: require.resolve('tty-browserify'),
        zlib: require.resolve('browserify-zlib')
    },
    modules: ['node_modules'],
    plugins: [new DirectoryNamedPlugin()],
    symlinks: false
})
