const isLegacyBuild = require('./util/isLegacyBuild')
const isLibrary = require('./util/isLibrary')

const buildTargetDependentConfig = (env) => {
    if (isLegacyBuild(env)) {
        return { modules: 'commonjs' }
    }

    return { modules: false }
}

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
    shippedProposals: true,
    ...buildTargetDependentConfig(env),
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
