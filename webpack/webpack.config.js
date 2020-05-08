const path = require('path');
const {
    DIST_BASE_PATH,
    PUBLIC_PATH_DEFAULT,
    PUBLIC_PATH_WORDPRESS,
    SRC_PATH,
    SRC_ETC_PATH,
    SRC_IMG_PATH,
    SRC_CSS_PATH,
    SRC_JS_ENTRY_PATH,
} = require('./path');

const merge = require('webpack-merge');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const modeBaseConfig = process.env.BUILD_CONFIG === 'development'
    ? require('./webpack.config.development.js')
    : require('./webpack.config.production.js');

const wordPressConfig = {
    name: 'wordpress-assets',
    entry: {
        'merchant-map': path.resolve(
            SRC_JS_ENTRY_PATH, 'WordPress_MerchantMap.jsx'
        ),
        'toilet-paper-calculator': path.resolve(
            SRC_JS_ENTRY_PATH, 'WordPress_ToiletPaperCalculator.jsx'
        ),
        'wordpress-theme-main': path.resolve(
            SRC_CSS_PATH, 'wordpress-theme-main.css'
        ),
    },
    output: {
        filename: 'static/js/[name].bundle.js',
        path: path.resolve(DIST_BASE_PATH, 'wordpress-theme'),
        publicPath: PUBLIC_PATH_WORDPRESS,
    },
};

const merchantMapDistPath = path.resolve(DIST_BASE_PATH, 'merchant-map');

const merchantMapConfig = {
    name: 'merchant-map',
    entry: {
        'merchant-map': path.resolve(
            SRC_JS_ENTRY_PATH, 'StandaloneAppShell_MerchantMap.jsx'
        ),
    },
    output: {
        filename: '[name].bundle.js',
        path: merchantMapDistPath,
        publicPath: PUBLIC_PATH_DEFAULT,
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: path.resolve(SRC_IMG_PATH, 'favicon.png'),
            title: "Händlerkarte",
            // hash: true,  // TODO: decide
            meta: {
                viewport:
                    'width=device-width, initial-scale=1, shrink-to-fit=no',
                'theme-color': '#ffe300',  // TODO: Make dynamic? (Build time?)
                generator: 'webpack',
                googlebot: 'index,follow',
                rating: 'General',
                referrer: 'origin',
                robots: 'index,follow',
                subject: "Hier bekommst Du unsere Produkte",
            },
            scriptLoading: 'defer',
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(SRC_ETC_PATH, '.htaccess'),
                to: merchantMapDistPath,
            },
        ]),
    ],
};

module.exports = [
    merge(modeBaseConfig, wordPressConfig),
    merge(modeBaseConfig, merchantMapConfig),
]
