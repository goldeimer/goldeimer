const {
    isFont,
    isJavaScript,
    isRasterImage,
    isStylesheet,
    isVectorImage
} = require('../condition')
const { IS_PRODUCTION_BUILD } = require('../env')

const makeFileLoaderOutputName = (resourcePath, resourceQuery) => {
    if (!IS_PRODUCTION_BUILD) {
        return '[path][name].[ext]'
    }

    return '[path][contenthash].[ext]'
}

const fileLoader = {
    loader: 'file-loader',
    options: {
        name: makeFileLoaderOutputName,
        outputPath: 'static'
    }
}

const imageLoader = {
    loader: 'image-webpack-loader',
    options: {
        gifsicle: {
            interlaced: false
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
        issuer: isJavaScript,
        use: [{
            loader: 'svg-inline-loader',
            options: {
                classPrefix: true,
                idPrefix: true
            }
        }, imageLoader]
    },
    {
        issuer: isStylesheet,
        use: [{
            loader: 'svg-url-loader',
            options: {
                iesafe: true,
                limit: 8192,
                name: makeFileLoaderOutputName,
                outputPath: 'static'
            }
        }, imageLoader]
    }]
},
{
    test: isRasterImage,
    use: [
        fileLoader,
        imageLoader
    ]
},
{
    test: isFont,
    use: [
        fileLoader
    ]
}]

module.exports = rules
