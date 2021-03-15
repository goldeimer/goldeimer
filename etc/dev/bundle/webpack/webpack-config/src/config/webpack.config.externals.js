const nodeExternals = require('webpack-node-externals')

const peerDependencies = (
    pkgInfo,
    treatPeerDepsAsExternals
) => (
    treatPeerDepsAsExternals
        ? pkgInfo.dependencyList.peerDependencies.map((packageName) => (
            new RegExp(`^${packageName}(/.*)?$`, 'u')
        ))
        : []
)

module.exports = ({
    externals = [],
    externalsWhitelist = [],
    nodeExternalsEnabled = false,
    pkgInfo,
    treatPeerDepsAsExternals = true
}) => {
    if (nodeExternalsEnabled) {
        return [nodeExternals({
            allowlist: externalsWhitelist
        })]
    }

    return [
        ...externals,
        ...peerDependencies(
            pkgInfo,
            treatPeerDepsAsExternals
        )
    ]
}
