const { BuildTarget } = require('@goldeimer/compile-util')

module.exports = ({ buildTarget }) => ({
    asyncWebAssembly: true,
    outputModule: buildTarget === BuildTarget.ESM,
    topLevelAwait: true
})
