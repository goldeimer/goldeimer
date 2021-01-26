const isDevelopmentBuild = require('./util/isDevelopmentBuild')
const isUmdBuild = require('./util/isUmdBuild')
const isLibrary = require('./util/isLibrary')

const modeDependentPlugins = (env) => {
    if (isDevelopmentBuild(env)) {
        return []
    }

    const library = isLibrary(env)
    return [
        '@babel/plugin-transform-react-constant-elements',
        'babel-plugin-transform-dev-warning',
        [
            'babel-plugin-transform-react-remove-prop-types', {
                mode: library ? 'unsafe-wrap' : 'remove',
                removeImport: !library
            }
        ]
    ]
}

const transformRuntime = (env) => ([
    '@babel/plugin-transform-runtime', {
        absoluteRuntime: false,
        bugfixes: true,
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules: !isUmdBuild(env)
    }
])

module.exports = (env) => ([
    // ['babel-plugin-macros', {}],
    'babel-plugin-optimize-clsx',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
    '@babel/plugin-transform-unicode-regex',
    ...modeDependentPlugins(env),
    transformRuntime(env)
])
