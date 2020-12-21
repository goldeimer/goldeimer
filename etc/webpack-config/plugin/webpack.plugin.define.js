const { EnvironmentPlugin } = require('webpack')

module.exports = (definitions = {}) => new EnvironmentPlugin({
    BABEL_ENV: '',
    NODE_ENV: 'production',
    ...definitions
})
