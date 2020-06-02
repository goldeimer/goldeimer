const path = require('path')

const PROJECT_PATH = path.resolve(__dirname, '..')
const SRC_PATH = path.resolve(PROJECT_PATH, 'src')
const SRC_JS_PATH = path.resolve(SRC_PATH, 'js')

module.exports = {
    PROJECT_PATH,
    // --- sources ---
    SRC_PATH,
    SRC_CSS_PATH: path.resolve(SRC_PATH, 'css'),
    SRC_ETC_PATH: path.resolve(SRC_PATH, 'etc'),
    SRC_IMG_PATH: path.resolve(SRC_PATH, 'img'),
    SRC_JS_PATH,
    SRC_JS_APP_PATH: path.resolve(SRC_JS_PATH, 'app'),
    SRC_JS_CONFIG_PATH: path.resolve(SRC_JS_PATH, 'config'),
    SRC_JS_ENTRY_PATH: path.resolve(SRC_JS_PATH, 'entry'),
    SRC_JS_LIB_PATH: path.resolve(SRC_JS_PATH, 'lib'),
    // --- public ---
    PUBLIC_PATH_DEFAULT: '/',
    PUBLIC_PATH_WORDPRESS: '/wp-content/themes/enfold-child/',
}
