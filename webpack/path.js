const path = require('path');


const PROJECT_PATH = path.resolve(__dirname, '..');
const SRC_PATH = path.resolve(PROJECT_PATH, 'src');


module.exports = {
    // sources
    SRC_PATH: SRC_PATH,
    SRC_APPS_PATH: path.resolve(SRC_PATH, 'js', 'apps'),
    SRC_COMPONENT_PATH: path.resolve(SRC_PATH, 'js', 'components'),
    SRC_CONFIG_PATH: path.resolve(SRC_PATH, 'js', 'config'),
    SRC_CSS_PATH: path.resolve(SRC_PATH, 'css'),
    SRC_HOOKS_PATH: path.resolve(SRC_PATH, 'js', 'hooks'),
    SRC_PROP_TYPES_PATH: path.resolve(SRC_PATH, 'js', 'propTypes'),
    SRC_UTIL_PATH: path.resolve(SRC_PATH, 'js', 'util'),
    SRC_JS_PATH: path.resolve(SRC_PATH, 'js'),
    // destination
    DIST_BASE_PATH: PROJECT_PATH,
    // destination specific
    PUBLIC_PATH_WORDPRESS: '/wp-content/themes/enfold-child/static/',
    PUBLIC_PATH_DEFAULT: '/static/',
}
