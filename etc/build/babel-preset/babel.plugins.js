const isDevelopmentBuild = require('./util/isDevelopmentBuild')
const isUmdBuild = require('./util/isUmdBuild')
const isLegacyBuild = require('./util/isLegacyBuild')
const isLibrary = require('./util/isLibrary')

const modeDependentPlugins = (env) => {
    if (isDevelopmentBuild(env)) {
        return []
    }

    const _isLibrary = isLibrary(env)
    return [
        '@babel/plugin-transform-react-constant-elements',
        'babel-plugin-transform-dev-warning',
        [
            'babel-plugin-transform-react-remove-prop-types', {
                mode: _isLibrary ? 'unsafe-wrap' : 'remove',
                removeImport: !_isLibrary
            },
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
        useESModules: !isLegacyBuild(env) && !isUmdBuild(env)
    }
])

module.exports = (env) => ([
    // ['babel-plugin-macros', {}],
    'babel-plugin-optimize-clsx',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
    '@babel/plugin-transform-unicode-regex',
    ...modeDependentPlugins(env),
    // IE 11
    ...(isLegacyBuild(env) ? ['@babel/plugin-transform-object-assign'] : []),
    transformRuntime(env)
])
