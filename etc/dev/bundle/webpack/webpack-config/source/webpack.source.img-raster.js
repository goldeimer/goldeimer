const { RASTER_IMAGE } = require('../enum/WebpackRuleTest')

module.exports = (options = {}) => ({
    module: {
        rules: [{
            generator: {
                filename: 'img/[contenthash][ext]'
            },
            test: RASTER_IMAGE,
            type: 'asset/resource'
        }]
    }
})
