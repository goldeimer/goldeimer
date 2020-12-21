const {
    RUNTIME_TEMPLATE,
    TEXTFILE
} = require('../enum/WebpackRuleTest')

module.exports = () => ({
    module: {
        rules: [{
            test: [RUNTIME_TEMPLATE, TEXTFILE],
            type: 'asset/source'
        }]
    }
})
