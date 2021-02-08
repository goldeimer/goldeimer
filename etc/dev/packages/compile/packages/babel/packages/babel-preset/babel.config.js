/// @file babel.config.js
///
/// @see [github: babel-preset-env/corejs3/built-in](corejs-built-ins)
/// @see [browserslist: query composition](browserslist-query)

const plugins = require('./babel.plugins')
const presets = require('./babel.presets')

let env = 'production'

module.exports = (api) => {
    env = process.env.BABEL_ENV || process.env.NODE_ENV || env

    api.cache.using(() => env)

    return {
        plugins: plugins(env),
        presets: presets(env),
        env: {
            test: {
                sourceMaps: 'both'
            }
        }
    }
}
