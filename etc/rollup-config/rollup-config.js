const {
    pkgInfo,
    BuildTarget
} = require('@goldeimer/build-util')

const external = require('./rollup-config.external')
const plugins = require('./rollup-config.plugins')
const targetConfig = require('./rollup-config.target')

const baseConfig = ({
    info,
    isLibrary = true
}) => ({
    input: `src/${info.names.name}.js`,
    plugins: plugins({ isLibrary })
})

const config = (pkg) => ({
    configDependenciesAreExternal: dependenciesAreExternal,
    configIsLibrary: isLibrary = true,
    configPeerDependenciesAreExternal: peerDependenciesAreExternal,
    configTarget
}) => {
    const info = pkgInfo(pkg)

    process.env.BABEL_ENV = `${isLibrary ? 'library-' : ''}${configTarget}`
    process.env.NODE_ENV = 'production'

    const baseCfg = baseConfig({
        info,
        isLibrary
    })

    const assembleConfigs = (target) => ({
        ...baseCfg,
        ...targetConfig({
            info,
            target
        }),
        external: external({
            dependenciesAreExternal,
            info,
            isLibrary,
            peerDependenciesAreExternal,
            target
        })
    })

    if (configTarget === undefined) {
        return Object.values(BuildTarget).filter(
            // Disable UMD builds for now,
            // as they aren't very maturely implemented.
            // TODO(Johannes):
            // Remove or improve.
            (target) => target !== BuildTarget.UMD
        ).map(
            (target) => assembleConfigs(target)
        )
    }

    return assembleConfigs(configTarget)
}

module.exports = config
