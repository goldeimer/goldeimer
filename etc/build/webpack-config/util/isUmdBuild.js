const { BuildTarget } = require('@goldeimer/build-util')

module.exports = (buildTarget) => buildTarget === BuildTarget.UMD
