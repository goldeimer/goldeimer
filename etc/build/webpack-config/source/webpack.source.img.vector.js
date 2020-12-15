const {
    JAVASCRIPT,
    NODE_MODULES,
    STYLESHEET,
    VECTOR_IMAGE
} = require('../enum/WebpackRuleTest')

module.exports = (options = {}) => ({
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
                }, require('./webpack.source.img.loader')(options)]
            },
            {
                issuer: STYLESHEET,
                use: [{
                    loader: 'svg-url-loader',
                    options: {
                        iesafe: true,
                        limit: 8192,
                        outputPath: 'static'
                    }
                }, require('./webpack.source.img.loader')(options)]
            }]
        }]
    }
})
