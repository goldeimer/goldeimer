const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { isStyleFile } = require('./condition')

const styleLoader = {
    test: isStyleFile,
    use: [
        {
            // TODO: media-query-splitting-plugin
            loader: MiniCssExtractPlugin.loader,
        },
        'css-loader',
        // 'postcss-loader',
    ],
}

module.exports = styleLoader
