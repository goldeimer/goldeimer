const isLibrary = require('./util/isLibrary')

const libraryDependentConfig = (env) => {
    if (isLibrary(env)) {
        return { useBuiltIns: false }
    }

    return {
        corejs: 3,
        useBuiltIns: 'usage'
    }
}

const presetEnv = (env) => (['@babel/preset-env', {
    bugfixes: true,
    browserslistEnv: env,
    debug: process.env.GE_BUILD_VERBOSE === 'true',
    loose: true,
    // facilitate tree-shaking
    modules: false,
    shippedProposals: true,
    ...libraryDependentConfig(env)
}])

const presetReact = [
    '@babel/preset-react',
    '@babel/preset-typescript'
]

module.exports = (env) => ([
    presetEnv(env),
    ...presetReact
])
