const path = require('path');


const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestWebpackPlugin = require('webpack-manifest-plugin');


module.exports = {
    mode: 'development',
    entry: {
        toilet_paper_calculator_standalone: './src/js/toilet-paper-calculator-standalone.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ManifestWebpackPlugin(),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }
        rules: [
        {
            test: /\.css$/,
            use: [
            'style-loader',
            'css-loader'
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
};
