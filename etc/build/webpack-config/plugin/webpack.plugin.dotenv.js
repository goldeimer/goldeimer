const DotenvPlugin = require('dotenv-webpack')

module.exports = ({
    context,
    options = {}
} = {}) => new DotenvPlugin({
    allowEmptyValues: false,
    defaults: '.env.defaults',
    expand: true,
    path: context,
    safe: true,
    systemvars: false,
    root: true,
    silent: false,
    ...options
})
