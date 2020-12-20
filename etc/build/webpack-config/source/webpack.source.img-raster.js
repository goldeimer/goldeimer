const { RASTER_IMAGE } = require('../enum/WebpackRuleTest')

module.exports = (options = {}) => ({
    module: {
        rules: [{
            test: RASTER_IMAGE,
            type: 'asset/resource'
        }]
    }
})
