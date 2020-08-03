const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { isStylesheet } = require('../condition')

const styleLoader = {
    test: isStylesheet,
    // TODO: media-query-splitting-plugin ?
    use: [
        MiniCssExtractPlugin.loader,
        { loader: 'css-loader', options: { sourceMap: true } },
        { loader: 'postcss-loader', options: { sourceMap: true } }
    ]
}

module.exports = styleLoader
