const path = require('path');
const { DIST_PATH, PUBLIC_PATH, SRC_PATH } = require('./path');


const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestWebpackPlugin = require('webpack-manifest-plugin');


module.exports = {
    entry: {
        toilet_paper_calculator_standalone: path.resolve(
            SRC_PATH, 'js', 'ToiletPaperCalculatorStandalone.js'
        )
    },
    output: {
        filename: '[name].bundle.js',
        path: DIST_PATH,
        publicPath: PUBLIC_PATH,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ManifestWebpackPlugin(),
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
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
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
