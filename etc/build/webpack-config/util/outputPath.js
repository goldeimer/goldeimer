const path = require('path')

const BuildTarget = require('../enum/BuildTarget')

module.exports = ({
    buildTarget = BuildTarget.STABLE,
    context
}) => path.resolve(...[
    context,
    'dist',
    ...(buildTarget === BuildTarget.STABLE
        ? []
        : [buildTarget])
])
