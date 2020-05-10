const webpack = require('webpack');

const path = require('path');
const {
    SRC_CSS_PATH,
    SRC_JS_PATH,
    SRC_JS_ACTIONS_PATH,
    SRC_JS_APPS_PATH,
    SRC_JS_COMPONENTS_PATH,
    SRC_JS_CONFIG_PATH,
    SRC_JS_ENUM_PATH,
    SRC_JS_HOOKS_PATH,
    SRC_JS_PROP_TYPES_PATH,
    SRC_JS_REDUCERS_PATH,
    SRC_JS_SELECTORS_PATH,
    SRC_JS_UTIL_PATH,
} = require('./path');

const ManifestWebpackPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const makeNamePreserveRelativeAssetDirectory = (file) => {
    const srcDirName = path.relative(
        path.join(__dirname, '..', 'src'),
        path.dirname(file)
    );

    return `static/${srcDirName}/[name].[ext]`;
};

module.exports = {
    plugins: [
        new ManifestWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].css',
            chunkFilename: 'static/css/[id].css',
        }),
        new webpack.DefinePlugin({}),
    ],
    resolve: {
        alias: {
            // --- closed semantic logic units ---
            apps: SRC_JS_APPS_PATH,
            'merchant-map': path.resolve(SRC_JS_APPS_PATH, 'MerchantMap'),
            // --- common js src ---
            actions: SRC_JS_ACTIONS_PATH,
            components: SRC_JS_COMPONENTS_PATH,
            config: SRC_JS_CONFIG_PATH,
            css: SRC_CSS_PATH,
            enum: SRC_JS_ENUM_PATH,
            hooks: SRC_JS_HOOKS_PATH,
            js: SRC_JS_PATH,
            propTypes: SRC_JS_PROP_TYPES_PATH,
            reducers: SRC_JS_REDUCERS_PATH,
            selectors: SRC_JS_SELECTORS_PATH,
            util: SRC_JS_UTIL_PATH,
        },
        extensions: ['.js', '.jsx', '.json', '.ts',],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    eslintPath:
                        'eslint-config-airbnb-standard/node_modules/eslint',
                    fix: true,
                    failOnError: true,
                    // failOnWarning: true,
                },
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
            },
            {
                // TODO: media-query-splitting-plugin
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        // options: {
                        //     hmr: process.env.NODE_ENV === 'development',
                        // },
                    },
                    'css-loader',
                    // 'postcss-loader',
                    // 'sass-loader',
                ],
            },
            {
                // TODO: Image optimization.
                test: /\.(gif|jp(e?)g|png|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: makeNamePreserveRelativeAssetDirectory,
                    },
                },
            },
            {
                test: /\.(eot|otf|pbf||ttf|woff|woff2)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: makeNamePreserveRelativeAssetDirectory,
                    },
                },
            },
        ],
    },
}
