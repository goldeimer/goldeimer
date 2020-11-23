const { BuildTarget } = require('@goldeimer/build-util')

module.exports = ({ buildTarget }) => ({
    asyncWebAssembly: true,
    outputModule: buildTarget === BuildTarget.ESM,
    topLevelAwait: true
})
