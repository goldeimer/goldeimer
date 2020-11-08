/// @file babel.config.js
///
/// @see [github: babel-preset-env/corejs3/built-in](corejs-built-ins)
/// @see [browserslist: query composition](browserslist-query)

const plugins = require('./babel.plugins')
const presets = require('./babel.presets')

let _env = 'production'

module.exports = (api) => {
    _env = process.env.BABEL_ENV || process.env.NODE_ENV || _env

    api.cache.using(() => _env)

    return {
        plugins: plugins(_env),
        presets: presets(_env),
        env: {
            test: {
                sourceMaps: 'both'
            }
        }
    }
}
