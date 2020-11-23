const { BuildTarget } = require('@goldeimer/build-util')

const path = require('path')

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
