const RunMode = {
    PROFILE: 'profile',
    STANDARD: 'standard',
    WATCH: 'watch'
}

const Configs = {
    [RunMode.PROFILE]: () => require('../config/webpack.config.run.profile'),
    [RunMode.WATCH]: () => require('../config/webpack.config.run.watch')
}

const getConfig = (runMode) => (
    Configs[runMode]
        ? webpack.config.getNormalizedWebpackOptions(
            Configs[runMode]()
        ) : {}
)

module.exports = {
    ...RunMode,
    getConfig
}
