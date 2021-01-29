const { BuildTarget } = require('@goldeimer/compile-util')

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
