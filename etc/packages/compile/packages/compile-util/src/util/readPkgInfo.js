const pkgInfo = require('./pkgInfo')

const readPkgInfo = (pkgPath) => pkgInfo(
    // eslint-disable-next-line import/no-dynamic-require
    require(`${pkgPath}/package.json`)
)

module.exports = readPkgInfo
