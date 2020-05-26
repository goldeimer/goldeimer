const { isJavaScriptFile } = require('./condition')

const babelLoader = {
    test: isJavaScriptFile,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader'
    },
}

module.exports = babelLoader
