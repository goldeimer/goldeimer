const path = require('path');
const {
    DIST_BASE_PATH,
    PUBLIC_PATH_DEFAULT,
    PUBLIC_PATH_WORDPRESS,
    SRC_PATH,
    SRC_JS_PATH,
} = require('./path');

const merge = require('webpack-merge');


const modeBaseConfig = process.env.BUILD_CONFIG === 'development'
    ? require('./webpack-config.development.js')
    : require('./webpack-config.production.js');


const wordPressConfig = {
    name: 'wordpress-assets',
    entry: {
        merchant_map: path.resolve(
            SRC_JS_PATH, 'apps', 'MerchantMapWordPress.js'
        ),
        toilet_paper_calculator: path.resolve(
            SRC_JS_PATH, 'apps', 'ToiletPaperCalculator.js'
        ),
        wordpress_theme_main: path.resolve(
            SRC_PATH, 'css', 'wordpress-theme-main.css'
        ),
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(DIST_BASE_PATH, 'wordpress-theme', 'static'),
        publicPath: PUBLIC_PATH_WORDPRESS,
    },
};


const merchantMapConfig = {
    name: 'merchant-map',
    entry: {
        merchant_map: path.resolve(
            SRC_JS_PATH, 'apps', 'MerchantMap.js'
        ),
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(DIST_BASE_PATH, 'merchant-map', 'static'),
        publicPath: PUBLIC_PATH_DEFAULT,
    },
};


module.exports = [
    merge(modeBaseConfig, wordPressConfig),
    merge(modeBaseConfig, merchantMapConfig),
]
