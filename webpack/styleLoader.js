const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { isStyleFile } = require('./condition')
const { IS_DEVELOPMENT_BUILD } = require('./env')

const styleLoader = {
    test: isStyleFile,
    // TODO: media-query-splitting-plugin ?
    use: [
        MiniCssExtractPlugin.loader,
        { loader: 'css-loader', options: { sourceMap: true } },
        { loader: 'postcss-loader', options: { sourceMap: true } },
    ],
}

module.exports = styleLoader
