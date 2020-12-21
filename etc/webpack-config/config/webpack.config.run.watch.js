const {
    NODE_MODULES,
    RUN_ROOT
} = require('../enum/WebpackRuleTest')

module.exports = {
    optimization: {
        emitOnErrors: true
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 500,
        ignored: [
            NODE_MODULES,
            RUN_ROOT
        ],
        'info-verbosity': 'verbose'
    }
}
