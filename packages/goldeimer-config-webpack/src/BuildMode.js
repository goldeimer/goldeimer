/// @enum {string} BuildMode
///
/// The build mode value is passed into the build process from the initial,
/// outermost CLI-based build trigger, or its execution environment,
/// respectively.
///
/// @see The choices directly map to both webpack's [`mode`](webpack:mode)
///      configuration parameter as well as node's standard
///      `process.env.NODE_ENV` build flag. Setting the build mode [environment
///      variable](webpack:env) from the calling environment will set the other
///      two corresponding flags. `BuildMode` sets webpack `mode`, which in turn
///      sets `process.env.NODE_ENV` via webpack's `DefinePlugin`.
///      The same does *not* hold true for the reverse direction.
///
/// [webpack:env]:  https://webpack.js.org/guides/environment-variables/
/// [webpack:mode]: https://webpack.js.org/configuration/mode/

const BuildMode = {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production'
}

const buildModeConfig = {
    // webpack `mode` is set in these two partial configs
    [BuildMode.DEVELOPMENT]: require('./webpack.config.mode.development'),
    [BuildMode.PRODUCTION]: require('./webpack.config.mode.production')
}

const throwOnIvalidConfig = (config) => {
    if (!config) {
        throw new Error(
            'Invalid build mode config or invalid build mode value passed.'
        )
    }

    return config
}

module.exports = {
    BuildMode,
    buildModeConfig: (mode) => throwOnIvalidConfig(
        buildModeConfig[mode]
    )
}
