
module.exports = (context) => {
    pkg = require(`${context}/package.json`)

    const nameParts = pkg.name.replace(
        /^@/u,
        ''
    ).split('/', 2)

    const pkgInfo = {
        name: nameParts.pop(),
        scope: nameParts.length ? nameParts.pop() : null,
        peerDependencies: pkg.peerDependencies
            ? Object.keys(pkg.peerDependencies)
            : []
    }

    pkgInfo.scopedName = `${pkgInfo.scope ? `${pkgInfo.scope}-` : ''}${pkgInfo.name}`

    return pkgInfo
}
