const isDevelopmentMode = require('../util/isDevelopmentMode')

module.exports = (mode) => {
    if (isDevelopmentMode(mode)) {
        // TODO(Johannes): Pass as argument.
        // uncomment to get readable transpilation output
        return false
        // return 'eval-cheap-module-source-map'
    }

    return 'source-map'
}
