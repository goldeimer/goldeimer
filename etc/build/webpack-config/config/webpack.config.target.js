const BuildTarget = require('../enum/BuildTarget')

module.exports = (buildTarget) => {
    switch (buildTarget) {
    case BuildTarget.ESM:
        return 'es6'

    case BuildTarget.LEGACY:
        return 'es5'

    case BuildTarget.STABLE:
    case BuildTarget.UMD:
        return 'browserslist'

    default:
        return 'web'
    }
}
