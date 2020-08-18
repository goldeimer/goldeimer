/// @enum {string} Abspath
///
/// Enumeration of (simple) regular expressions testing file names / paths
/// for matches against file extensions (against the end of a
/// non-period-terminated string).
/// Primary use case is as an argument for webpack's `resolve.extensions`
/// configuration directive.

module.exports = {
    CONFIG: /((\.(cfg|config(\.js)?|ini))|rc(\.js)?)$/u,
    FONT: /\.(eot|otf|pbf|ttf|woff|woff2)$/u,
    MARKUP: /\.htm(l?)$/u,
    NODE_MODULES: /[\\/]node_modules[\\/]/u,
    JAVASCRIPT: /\.(js|jsx)$/u,
    JSON: /\.(json)$/u,
    JS_STYLESHEET: /\.jss$/u,
    RASTER_IMAGE: /\.(gif|jpe?g|png)(\?v=\d+\.\d+\.\d+)?$/u,
    SHELL_SCRIPT: /\.(ba|c|k|z)sh$/u,
    STYLESHEET: /\.(sa|sc|le|c)ss$/u,
    TEXTFILE: /\.(md|txt)$/u,
    TYPE_SCRIPT: /\.(ts|tsx)$/u,
    VECTOR_IMAGE: /\.svg(\?v=\d+\.\d+\.\d+)?$/u
}
