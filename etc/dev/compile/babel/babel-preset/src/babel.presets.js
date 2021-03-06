const isLibrary = require('./util/isLibrary')

const _rr = require.resolve

const libraryDependentConfig = (env) => {
    if (isLibrary(env)) {
        return { useBuiltIns: false }
    }

    return {
        corejs: 3,
        useBuiltIns: 'usage'
    }
}

const presetEnv = (env) => ([_rr('@babel/preset-env'), {
    bugfixes: true,
    browserslistEnv: env,
    debug: process.env.BUILD_VERBOSE === 'true',
    loose: true,
    // facilitate tree-shaking
    modules: false,
    shippedProposals: true,
    ...libraryDependentConfig(env)
}])

module.exports = (env) => ([
    presetEnv(env),
    _rr('@babel/preset-react'),
    _rr('@babel/preset-typescript')
])
