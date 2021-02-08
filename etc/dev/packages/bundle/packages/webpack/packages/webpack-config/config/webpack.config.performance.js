const WebpackMode = require('../enum/WebpackMode')

module.exports = (mode) => {
    if (mode === WebpackMode.DEVELOPMENT) {
        return {}
    }

    return {
        assetFilter: (assetFileName) => !assetFileName.match(/(.*\.)?stats(\..*)?\.json$/u),
        hints: 'warning',
        // TODO(Johannes):
        // tighter size constraints?
        maxAssetSize: 5e6,
        maxEntrypointSize: 3e6
    }
}
