const { merge } = require('webpack-merge')

module.exports = (options = {}) => ({
    loader: 'image-webpack-loader',
    options: merge(options, {
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
    })
})
