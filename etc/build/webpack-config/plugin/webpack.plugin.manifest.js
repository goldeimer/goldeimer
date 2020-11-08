const AssetsManifestPlugin = require('webpack-assets-manifest')

module.exports = () => new AssetsManifestPlugin({
    entrypoints: true,
    output: 'artifacts/manifest.json',
    publicPath: false,
    space: 4
})
