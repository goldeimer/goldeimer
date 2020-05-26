const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const styleLoader = {
    test: /\.(sa|sc|c)ss$/,
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
