const isUmdBuild = require('./isUmdBuild')

module.exports = (buildTarget) => isUmdBuild(buildTarget)
