module.exports = {
    isConfigFile: /((\.(cfg|config(\.js)?|ini))|rc(\.js)?)$/,
    isFont: /\.(eot|otf|pbf|ttf|woff|woff2)$/,
    isMarkup: /\.htm(l?)$/,
    isJavaScript: /\.(js|jsx)$/,
    isJavaScriptStylesheet: /\.jss$/,
    isJson: /\.(json)$/,
    isRasterImage: /\.(gif|jpe?g|png)(\?v=\d+\.\d+\.\d+)?$/,
    isShellScript: /\.(ba|c|k|z)sh$/,
    isStylesheet: /\.(sa|sc|le|c)ss$/,
    isTextFile: /\.(md|txt)$/,
    isTypeScript: /\.(ts|tsx)$/,
    isVectorImage: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
}
