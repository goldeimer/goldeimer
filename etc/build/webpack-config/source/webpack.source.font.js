const { FONT } = require('../enum/WebpackRuleTest')

module.exports = () => ({
    module: {
        rules: [{
            test: FONT,
            type: 'asset/resource',
            generator: {
                filename: 'static/font/[contenthash][ext][query]'
            }
        }]
    }
})
