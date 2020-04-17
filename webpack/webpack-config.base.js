const path = require('path');
const { DIST_PATH, PUBLIC_PATH, SRC_PATH } = require('./path');


const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestWebpackPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    entry: {
        toilet_paper_calculator_standalone: path.resolve(
            SRC_PATH, 'js', 'ToiletPaperCalculatorStandalone.js'
        ),
        wordpress_theme_main: path.resolve(
            SRC_PATH, 'css', 'WordPressThemeMain.css'
        ),
    },
    output: {
        filename: '[name].bundle.js',
        path: DIST_PATH,
        publicPath: PUBLIC_PATH,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ManifestWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
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
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader',
                ],
            },
        ],
    },
}
