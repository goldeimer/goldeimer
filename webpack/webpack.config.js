const path = require('path');
const {
    DIST_BASE_PATH,
    PUBLIC_PATH_DEFAULT,
    PUBLIC_PATH_WORDPRESS,
    SRC_PATH,
    SRC_JS_PATH,
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
        merchant_map: path.resolve(
            SRC_JS_PATH, 'apps', 'MerchantMapWordPress.jsx'
        ),
        toilet_paper_calculator: path.resolve(
            SRC_JS_PATH, 'apps', 'ToiletPaperCalculator.jsx'
        ),
        wordpress_theme_main: path.resolve(
            SRC_PATH, 'css', 'wordpress-theme-main.css'
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
        merchant_map: path.resolve(
            SRC_JS_PATH, 'apps', 'MerchantMapStandaloneAppShell.jsx'
        ),
    },
    output: {
        filename: '[name].bundle.js',
        path: merchantMapDistPath,
        publicPath: PUBLIC_PATH_DEFAULT,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(SRC_PATH, 'html', 'merchant-map.html'),
            favicon: path.resolve(SRC_PATH, 'img', 'favicon.png'),
            title: "Händlerkarte",
            // hash: true,  // TODO: decide
            meta: {
                viewport:
                'width=device-width, initial-scale=1, shrink-to-fit=no',
                'theme-color': '#ffe300',
                generator: 'webpack',
                googlebot: 'index,follow',
                rating: 'General',
                referrer: 'origin',
                robots: 'index,follow',
                subject: "Hier bekommst Du unsere Produkte"
            },
            scriptLoading: 'defer',
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(SRC_PATH, 'etc', '.htaccess'),
                to: merchantMapDistPath
            },
        ]),
    ]
};

module.exports = [
    merge(modeBaseConfig, wordPressConfig),
    merge(modeBaseConfig, merchantMapConfig),
]
