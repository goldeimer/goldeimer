const path = require('path');

const PROJECT_PATH = path.resolve(__dirname, '..');
const SRC_PATH = path.resolve(PROJECT_PATH, 'src');
const SRC_JS_PATH = path.resolve(SRC_PATH, 'js');

module.exports = {
    // --- sources ---
    SRC_PATH: SRC_PATH,
    SRC_CSS_PATH: path.resolve(SRC_PATH, 'css'),
    SRC_ETC_PATH: path.resolve(SRC_PATH, 'etc'),
    SRC_IMG_PATH: path.resolve(SRC_PATH, 'img'),
    SRC_JS_PATH: SRC_JS_PATH,
    SRC_JS_ACTIONS_PATH: path.resolve(SRC_JS_PATH, 'actions'),
    SRC_JS_APPS_PATH: path.resolve(SRC_JS_PATH, 'apps'),
    SRC_JS_COMPONENTS_PATH: path.resolve(SRC_JS_PATH, 'components'),
    SRC_JS_CONFIG_PATH: path.resolve(SRC_JS_PATH, 'config'),
    SRC_JS_ENUM_PATH: path.resolve(SRC_JS_PATH, 'enum'),
    SRC_JS_ENTRY_PATH: path.resolve(SRC_JS_PATH, 'entry'),
    SRC_JS_HOOKS_PATH: path.resolve(SRC_JS_PATH, 'hooks'),
    SRC_JS_PROP_TYPES_PATH: path.resolve(SRC_JS_PATH, 'propTypes'),
    SRC_JS_REDUCERS_PATH: path.resolve(SRC_JS_PATH, 'reducers'),
    SRC_JS_SELECTORS_PATH: path.resolve(SRC_JS_PATH, 'selectors'),
    SRC_JS_STYLES_PATH: path.resolve(SRC_JS_PATH, 'styles'),
    SRC_JS_UTIL_PATH: path.resolve(SRC_JS_PATH, 'util'),
    // --- destination ---
    DIST_BASE_PATH: PROJECT_PATH,
    // --- public ---
    PUBLIC_PATH_WORDPRESS: '/wp-content/themes/enfold-child/',
    PUBLIC_PATH_DEFAULT: '/',
}
