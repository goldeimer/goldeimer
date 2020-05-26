const {
    isFontFile,
    isJavaScriptFile,
    isRasterImage,
    isStyleFile,
    isVectorImage,
} = require('./condition')
const isDevBuild = require('./isDevBuild')

const makeFileLoaderOutputName = (resourcePath, resourceQuery) => {
    if (isDevBuild()) {
        return '[path][name].[ext]';
    }

    return '[path][contenthash].[ext]';
}

const fileLoader = {
    loader: 'file-loader',
    options: {
        name: makeFileLoaderOutputName,
        outputPath: 'static',
    },
}

const imageLoader = {
    loader: 'image-webpack-loader',
    options: {
        gifsicle: {
            interlaced: false,
        },
        mozjpeg: {
            progressive: true,
            quality: 75
        },
        optipng: {},
        pngquant: {
            quality: [0.65, 0.90],
            speed: 4
        },
        svgo: {},
        webp: {
            quality: 75
        }
    }
}

const rules = [{
    test: isVectorImage,
    oneOf: [{
        issuer: isJavaScriptFile,
        use: [{
            loader: 'svg-inline-loader',
            options: {
                classPrefix: true,
                idPrefix: true,
            },
        }, imageLoader]
    },
    {
        issuer: isStyleFile,
        use: [{
            loader: 'svg-url-loader',
            options: {
                iesafe: true,
                limit: 8192,
                name: makeFileLoaderOutputName,
                outputPath: 'static',
            },
        }, imageLoader]
    }],
},
{
    test: isRasterImage,
    use: [
        fileLoader,
        imageLoader,
    ],
},
{
    test: isFontFile,
    use: [
        fileLoader,
    ]
}]

module.exports = rules
