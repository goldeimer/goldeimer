/// @see https://webpack.js.org/plugins/environment-plugin/

const { EnvironmentPlugin } = require('webpack')

module.exports = ({
    definitions = {}
} = {}) => new EnvironmentPlugin({
    BABEL_ENV: 'production',
    NODE_ENV: 'production',
    ...definitions
})
