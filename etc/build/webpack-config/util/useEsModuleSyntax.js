const BuildTarget = require('../enum/BuildTarget')

module.exports = (buildTarget) => ![
    BuildTarget.LEGACY,
    BuildTarget.UMD
].includes(buildTarget)
