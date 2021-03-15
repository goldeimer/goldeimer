const isDevelopmentBuild = require('./util/isDevelopmentBuild')
const isUmdBuild = require('./util/isUmdBuild')
const isLibrary = require('./util/isLibrary')

const _rr = require.resolve

const modeDependentPlugins = (env) => {
    if (isDevelopmentBuild(env)) {
        return []
    }

    const library = isLibrary(env)
    return [
        _rr('@babel/plugin-transform-react-constant-elements'),
        _rr('babel-plugin-transform-dev-warning'),
        [
            _rr('babel-plugin-transform-react-remove-prop-types'), {
                mode: library ? 'unsafe-wrap' : 'remove',
                removeImport: !library
            }
        ]
    ]
}

const transformRuntime = (env) => ([
    _rr('@babel/plugin-transform-runtime'), {
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
    _rr('babel-plugin-optimize-clsx'),
    [_rr('@babel/plugin-proposal-class-properties'), { loose: true }],
    [_rr('@babel/plugin-proposal-object-rest-spread'), { loose: true }],
    _rr('@babel/plugin-transform-unicode-regex'),
    ...modeDependentPlugins(env),
    transformRuntime(env)
])
