const WebpackMode = require('../enum/WebpackMode')

module.exports = (mode) => {
    if (mode === WebpackMode.DEVELOPMENT) {
        return {}
    }

    return {
        // assetFilter: (assetFileName) => someTest(assetFileName),
        hints: 'warning',
        // TODO: tighter size constraints
        maxAssetSize: 5e6,
        maxEntrypointSize: 3e6
    }
}
