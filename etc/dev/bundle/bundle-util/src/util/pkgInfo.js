export const pkgInfo = (pkg) => {
    const nameParts = pkg.name.replace(
        /^@/u,
        ''
    ).split('/', 2)

    const names = {
        name: nameParts.pop(),
        scope: nameParts.length ? nameParts.pop() : null
    }

    names.scopedName = `${names.scope ? `${names.scope}-` : ''}${names.name}`

    return {
        ...pkg,
        names,
        dependencyList: {
            dependencies: pkg.dependencies
                ? Object.keys(pkg.dependencies)
                : [],
            peerDependencies: pkg.peerDependencies
                ? Object.keys(pkg.peerDependencies)
                : []
        }
    }
}

export default pkgInfo
