const {
    isUmdBuild
} = require('@goldeimer/build-util')

const external = ({
    dependenciesAreExternal = undefined,
    info,
    isLibrary = true,
    peerDependenciesAreExternal = true,
    target
}) => (id) => (
    (isLibrary && id.includes('@babel/runtime'))
        || (
            peerDependenciesAreExternal
            && (
                info.dependencyList.peerDependencies.findIndex(
                    (peerDependency) => id.startsWith(peerDependency)
                ) !== -1
            )
        )
        || (
            (
                dependenciesAreExternal === true
                || (
                    dependenciesAreExternal !== false
                    && !isUmdBuild(target)
                )
            )
            && (
                info.dependencyList.dependencies.findIndex(
                    (dependency) => id.startsWith(dependency)
                ) !== -1
            )
        )
)

module.exports = external
