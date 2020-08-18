const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { STYLESHEET } = require('./FileExtensionTest')

const chainedLoader = (name) => ({
    loader: name,
    options: { sourceMap: true }
})

module.exports = {
    module: {
        rules: [{
            test: STYLESHEET,
            // TODO:
            // consider using the `media-query-splitting-plugin`
            use: [
                MiniCssExtractPlugin.loader,
                chainedLoader('css-loader'),
                chainedLoader('postcss-loader')
            ]
        }]
    }
}
