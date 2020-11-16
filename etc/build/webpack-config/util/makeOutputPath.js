const path = require('path')

const BuildTarget = require('../enum/BuildTarget')

module.exports = ({
    buildTarget = BuildTarget.STABLE,
    context,
    outputPath
}) => path.resolve(...[
    context,
    outputPath,
    ...(buildTarget === BuildTarget.STABLE
        ? []
        : [buildTarget])
])
