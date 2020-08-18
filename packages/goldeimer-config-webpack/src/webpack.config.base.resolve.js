const DirectoryNamedPlugin = require('directory-named-webpack-plugin')

const { ALL } = require('./FileExtension')

module.exports = {
    aliasFields: ['browser'],
    cacheWithContext: false,
    extensions: ALL,
    // sensible choices for target 'web'
    mainFields: ['browser', 'module', 'main'],
    modules: ['node_modules'],
    plugins: [new DirectoryNamedPlugin()],
    symlinks: false,
    alias: {}
}
