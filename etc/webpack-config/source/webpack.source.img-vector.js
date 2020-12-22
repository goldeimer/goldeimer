const svgToMiniDataURI = require('mini-svg-data-uri')

const dataUrl = (content) => svgToMiniDataURI(
    typeof content !== 'string'
        ? content.toString()
        : content
)

const {
    JAVASCRIPT,
    STYLESHEET,
    VECTOR_IMAGE
} = require('../enum/WebpackRuleTest')

const makePrefix = ({
    prefix = 'goldeimer',
    digestAlgorithm = 'base36',
    hashAlgorithm = 'sha1',
    length = 7
} = {}) => `${prefix && prefix.length
    ? `${prefix}-`
    : ''}[${hashAlgorithm}:contenthash:${digestAlgorithm}:${length}]`

const PREFIX = makePrefix({})

module.exports = (options = {}) => ({
    module: {
        rules: [{
            test: VECTOR_IMAGE,
            oneOf: [{
                issuer: JAVASCRIPT,
                use: [{
                    loader: 'svg-inline-loader',
                    options: {
                        classPrefix: PREFIX,
                        idPrefix: PREFIX
                    }
                }]
            }, {
                generator: {
                    dataUrl,
                    filename: 'img/[contenthash][ext]'
                },
                issuer: STYLESHEET,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8192
                    }
                }
            }]
        }]
    }
})
