const defaultEntry = require('../util/defaultEntry')

module.exports = ({
    context,
    entries = [],
    pkgInfo = {}
}) => Object.fromEntries(
    entries.length
        ? entries
        : [defaultEntry({ context, pkgInfo })]
)
