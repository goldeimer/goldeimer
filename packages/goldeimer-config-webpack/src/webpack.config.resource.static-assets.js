const {
    FONT,
    JAVASCRIPT,
    NODE_MODULES,
    RASTER_IMAGE,
    STYLESHEET,
    VECTOR_IMAGE
} = require('./FileExtensionTest')

const outputName = '[path][name].[ext]'
// () => (
//     BuildMode.isProduction()
//         ? '[path][contenthash].[ext]'
//         : '[path][name].[ext]'
// )

const fileLoader = {
    loader: 'file-loader',
    options: {
        name: outputName,
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

module.exports = {
    module: {
        rules: [{
            test: VECTOR_IMAGE,
            exclude: NODE_MODULES,
            oneOf: [{
                issuer: JAVASCRIPT,
                use: [{
                    loader: 'svg-inline-loader',
                    options: {
                        classPrefix: true,
                        idPrefix: true
                    }
                }, imageLoader]
            },
            {
                issuer: STYLESHEET,
                use: [{
                    loader: 'svg-url-loader',
                    options: {
                        iesafe: true,
                        limit: 8192,
                        name: outputName,
                        outputPath: 'static'
                    }
                }, imageLoader]
            }]
        },
        {
            test: RASTER_IMAGE,
            use: [
                fileLoader,
                imageLoader
            ]
        },
        {
            test: FONT,
            use: [
                fileLoader
            ]
        }]
    }
}
