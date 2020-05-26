const {
    SRC_CSS_PATH,
    SRC_IMG_PATH,
    SRC_JS_PATH,
    SRC_JS_ACTIONS_PATH,
    SRC_JS_APPS_PATH,
    SRC_JS_COMPONENTS_PATH,
    SRC_JS_CONFIG_PATH,
    SRC_JS_ENUM_PATH,
    SRC_JS_HOOKS_PATH,
    SRC_JS_REDUCERS_PATH,
    SRC_JS_SELECTORS_PATH,
    SRC_JS_STYLES_PATH,
    SRC_JS_UTIL_PATH,
} = require('./path')

const extAssets = ['.svg', '.png', '.jpg', '.jpeg', '.ico',]
const extConfig = ['.cfg', '.config', '.ini', '.secret',]
const extDoc = ['.md', '.txt', '.pdf',]
const extSrc = ['.js', '.jsx', '.json', '.ts', '.wasm',]

const resolve = {
    alias: {
        // --- closed semantic logic units ---
        apps: SRC_JS_APPS_PATH,
        // --- common js src ---
        actions: SRC_JS_ACTIONS_PATH,
        components: SRC_JS_COMPONENTS_PATH,
        config: SRC_JS_CONFIG_PATH,
        enum: SRC_JS_ENUM_PATH,
        hooks: SRC_JS_HOOKS_PATH,
        js: SRC_JS_PATH,
        reducers: SRC_JS_REDUCERS_PATH,
        selectors: SRC_JS_SELECTORS_PATH,
        styles: SRC_JS_STYLES_PATH,
        util: SRC_JS_UTIL_PATH,
        // --- static assets ---
        css: SRC_CSS_PATH,
        img: SRC_IMG_PATH
    },
    aliasFields: ['browser'],
    extensions: Array.prototype.concat.call(
        extAssets, extConfig, extDoc, extSrc
    ),
    // sensible choices for target "web"
    mainFields: ['browser', 'module', 'main'],
    modules: ['node_modules']
}

module.exports = resolve
