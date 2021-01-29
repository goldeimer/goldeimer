const { BuildTarget } = require('@goldeimer/compile-util')

module.exports = (buildTarget) => buildTarget === BuildTarget.ESM
