const path = require('path');
const {
    DIST_PATH,
    PUBLIC_PATH,
    SRC_PATH,
    SRC_COMPONENT_PATH,
    SRC_JS_PATH,
} = require('./path');


const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestWebpackPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const makeNamePreserveRelativeAssetDirectory = (file) => {
    const srcDirName = path.relative(
        path.join(__dirname, '..', 'src'),
        path.dirname(file)
    );

    return `${srcDirName}/[name].[ext]`;
};


module.exports = {
    entry: {
        merchant_map_standalone: path.resolve(
            SRC_PATH, 'js', 'MerchantMapStandalone.js'
        ),
        toilet_paper_calculator_standalone: path.resolve(
            SRC_PATH, 'js', 'ToiletPaperCalculatorStandalone.js'
        ),
        wordpress_theme_main: path.resolve(
            SRC_PATH, 'css', 'wordpress-theme-main.css'
        ),
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: DIST_PATH,
        publicPath: PUBLIC_PATH,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ManifestWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css',
        }),
    ],
    resolve: {
        alias: {
            components: SRC_COMPONENT_PATH,
            js: SRC_JS_PATH,
        },
        extensions: ['.js', '.jsx', '.json',],
    },
    module: {
        rules: [
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
                        options: {
                            // hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                    // 'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: makeNamePreserveRelativeAssetDirectory,
                    },
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
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
