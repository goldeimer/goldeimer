const { ProgressPlugin } = require('webpack')

module.exports = ({ options = {} } = {}) => new ProgressPlugin({
    activeModules: true,
    dependencies: true,
    dependenciesCount: 1e4,
    entries: true,
    // handler: (percentage, message, ...args) => (/* .... /*),
    modules: true,
    modulesCount: 3e3,
    // @type string = null: 'entries' | 'dependencies' | 'modules' | null
    percentBy: 'entries',
    ...options
})
