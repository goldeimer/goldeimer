const { merge } = require('webpack-merge')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')

const DEFAULT_OPTIONS = {
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

module.exports = (
    options = {}
) => new ImageMinimizerPlugin({
    minimizerOptions: {
        plugins: Object.entries(
            merge(
                options,
                DEFAULT_OPTIONS
            )
        )
    }
})
