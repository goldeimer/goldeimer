/// @enum {string} Abspath
///
/// Enumeration of (simple) regular expressions testing file names / paths
/// for matches against file extensions (against the end of a
/// non-period-terminated string).
/// Primary use case is as an argument for webpack's `resolve.extensions`
/// configuration directive.

const escapeRegex = (string) => (
    string.replace(/[-\/\\^$*+?.()|[\]{}]/gu, '\\$&')
)

const NODE_MODULES_DIR_NAME = escapeRegex('/node_modules/')

module.exports = {
    FONT: /\.(eot|otf|pbf|ttf|woff|woff2)$/u,
    NODE_MODULES: new RegExp(NODE_MODULES_DIR_NAME, 'u'),
    JAVASCRIPT: /\.(mjs|js|jsx)$/u,
    JSON: /\.(json)$/u,
    JS_STYLESHEET: /\.jss$/u,
    RASTER_IMAGE: /\.(gif|jpe?g|png)(\?v=\d+\.\d+\.\d+)?$/u,
    RUNTIME_TEMPLATE: /\.eta\.ejs$/u,
    SHELL_SCRIPT: /\.(ba|c|k|z)sh$/u,
    STYLESHEET: /\.s?(a|c)ss$/u,
    TEXTFILE: /\.(md|txt)$/u,
    TYPESCRIPT: /\.(ts|tsx)$/u,
    VECTOR_IMAGE: /\.svg(\?v=\d+\.\d+\.\d+)?$/u,
    VENDOR_REACT: new RegExp(
        escapeRegex(
            `${NODE_MODULES_DIR_NAME}/(react(-dom)?)`,
            'u'
        )
    )
}
