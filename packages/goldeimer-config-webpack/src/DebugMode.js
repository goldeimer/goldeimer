/// @enum {string} DebugMode
///
/// Different ways to debug instances of the application.
/// Also serves the purpose of flagging the negative (not in debug mode).

const DebugMode = {
    DISABLED: 'disabled',
    LOCAL: 'local',
    REMOTE: 'remote'
}

module.exports = {
    DebugMode,
    isDebugModeEnabled: (mode) => [
        DebugMode.LOCAL,
        DebugMode.REMOTE
    ].includes(mode)
}
