const { babel } = require('@rollup/plugin-babel')
const commonjs = require('@rollup/plugin-commonjs')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const namedDirectory = require('rollup-plugin-named-directory')

const {
    pkgInfo,
    BuildTarget
} = require('@goldeimer/build-util')

const cjsConfig = ({ info }) => ({
    output: {
        file: info.main,
        format: 'cjs'
    }
})

const esmConfig = ({ info }) => ({
    output: {
        file: info.module,
        format: 'es'
    }
})

const umdConfig = ({ info }) => ({
    output: {
        file: info.browser,
        format: 'umd',
        name: info.names.scopedName
    }
})

const targetConfig = ({
    info,
    target
}) => {
    switch (target) {
    case BuildTarget.ESM:
        return esmConfig({ info })

    case BuildTarget.UMD:
        return umdConfig({ info })

    default:
        return cjsConfig({ info })
    }
}

const baseConfig = ({
    info,
    isLibrary,
    treatPeerDepsAsExternals
}) => ({
    external: (id) => (
        (isLibrary && id.includes('@babel/runtime'))
        || (
            treatPeerDepsAsExternals && (
                info.dependencyList.peerDependencies.findIndex(
                    (peerDependency) => id.includes(peerDependency)
                ) !== -1
            )
        )
    ),
    input: `src/${info.names.name}.js`,
    plugins: [
        babel({
            babelHelpers: isLibrary ? 'runtime' : 'bundled',
            exclude: 'node_modules/**',
            presets: ['@goldeimer']
        }),
        namedDirectory(),
        nodeResolve(),
        commonjs()
    ]
})

const config = (pkg) => ({
    configIsLibrary: isLibrary = true,
    configTarget,
    configTreatPeerDepsAsExternals: treatPeerDepsAsExternals = true
}) => {
    const info = pkgInfo(pkg)

    process.env.BABEL_ENV = `${isLibrary ? 'library-' : ''}${configTarget}`
    process.env.NODE_ENV = 'production'

    const baseCfg = baseConfig({
        info,
        isLibrary,
        treatPeerDepsAsExternals
    })

    const assembleConfigs = (target) => ({
        ...baseCfg,
        ...targetConfig({
            info,
            target
        })
    })

    if (configTarget === undefined) {
        return Object.values(BuildTarget).map(
            (target) => assembleConfigs(target)
        )
    }

    return assembleConfigs(configTarget)
}

module.exports = config
