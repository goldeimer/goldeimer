const { BuildTarget } = require('@goldeimer/build-util')

const path = require('path')

module.exports = ({
    buildTarget = BuildTarget.CJS,
    context,
    outputPath
}) => path.resolve(...[
    context,
    outputPath,
    ...(buildTarget === BuildTarget.CJS
        ? []
        : [buildTarget])
])
