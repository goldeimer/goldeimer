const isDevelopmentMode = require('../util/isDevelopmentMode')

module.exports = (mode) => {
    if (isDevelopmentMode(mode)) {
        return false
        return 'eval-cheap-module-source-map'
    }

    return 'source-map'
}
