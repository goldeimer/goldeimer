const isDevBuild = require('./isDevBuild')

const makeFileLoaderOutputName = (resourcePath, resourceQuery) => {
    if (isDevBuild()) {
        return '[path][name].[ext]';
    }

    return '[path][contenthash].[ext]';
}

const rules = [
    {
        // TODO: Image optimization.
        test: /\.(gif|jpe?g|png)$/,
        use: {
            loader: 'file-loader',
            options: {
                name: makeFileLoaderOutputName,
                outputPath: 'static',
            },
        },
    },
    {
        test: /\.(eot|otf|pbf|ttf|woff|woff2)$/,
        use: {
            loader: 'file-loader',
            options: {
                name: makeFileLoaderOutputName,
                outputPath: 'static',
            },
        },
    },
]

module.exports = rules
