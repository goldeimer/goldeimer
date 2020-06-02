const path = require('path')

const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin')

const {
    SRC_CSS_PATH,
    SRC_IMG_PATH,
    SRC_JS_APP_PATH,
    SRC_JS_CONFIG_PATH,
    SRC_JS_LIB_PATH,
} = require('./abspath')

const extAsset = ['.svg', '.png', '.jpg', '.jpeg', '.ico',]
const extCfg = ['.cfg', '.config', '.ini', '.secret',]
const extDoc = ['.md', '.txt', '.pdf',]
const extSrc = ['.js', '.jsx', '.json', '.ts', '.tsx', '.wasm',]

const resolve = {
    alias: {
        // --- semantically closed, logical units ---
        // (non-reusable, dedicated components)
        '@app': path.resolve(SRC_JS_APP_PATH),
        '@map': path.resolve(SRC_JS_APP_PATH, 'map'),
        '@tpc': path.resolve(SRC_JS_APP_PATH, 'tpc'),
        '@settings': path.resolve(SRC_JS_APP_PATH, 'settings'),
        // --- js src ---
        '@config': SRC_JS_CONFIG_PATH,
        '@lib': SRC_JS_LIB_PATH,
        // --- static assets ---
        '@assets/css': SRC_CSS_PATH,
        '@assets/img': SRC_IMG_PATH
    },
    aliasFields: ['browser'],
    cacheWithContext: false,
    extensions: Array.prototype.concat(extAsset, extCfg, extDoc, extSrc),
    // sensible choices for target "web"
    mainFields: ['browser', 'module', 'main'],
    modules: [path.resolve(__dirname, '..', 'node_modules')],
    plugins: [new DirectoryNamedWebpackPlugin()],
    symlinks: false
}

module.exports = resolve
