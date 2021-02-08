const isDevelopmentMode = require('../util/isDevelopmentMode')

module.exports = ({
    mode,
    sourceMap
}) => {
    if (sourceMap !== undefined) {
        return sourceMap
    }

    if (isDevelopmentMode(mode)) {
        return 'eval-cheap-module-source-map'
    }

    return 'source-map'
}
