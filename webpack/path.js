const path = require('path')

module.exports = {
    DIST_PATH: path.resolve(__dirname, '..', 'wordpress-theme', 'static'),
    PUBLIC_PATH: '/wp-content/themes/enfold-child/static/',
    SRC_PATH: path.resolve(__dirname, '..', 'src'),
    SRC_COMPONENT_PATH: path.resolve(__dirname, '..', 'src', 'js', 'components'),
    SRC_JS_PATH: path.resolve(__dirname, '..', 'src', 'js'),
}
