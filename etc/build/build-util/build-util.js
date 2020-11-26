const isUmdBuild = require('./util/isUmdBuild')
const pkgInfo = require('./util/pkgInfo')
const readPkgInfo = require('./util/readPkgInfo')
const BuildTarget = require('./enum/BuildTarget')

module.exports = {
    isUmdBuild,
    pkgInfo,
    readPkgInfo,
    BuildTarget
}
