const BuildTarget = require('../enum/BuildTarget')

module.exports = (buildTarget) => ({
    asyncWebAssembly: true,
    outputModule: buildTarget === BuildTarget.ESM,
    topLevelAwait: true
})
