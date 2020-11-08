const { DefinePlugin } = require('webpack')

module.exports = (definitions = {}) => new DefinePlugin(
    Object.fromEntries(
        Object.entries({
            PACKAGE_VERSION: process.env.npm_package_version,
            ...definitions
        }).map(([key, definition]) => ([
            key,
            JSON.stringify(definition)
        ]))
    )
)
