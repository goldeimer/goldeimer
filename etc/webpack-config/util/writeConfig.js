const fs = require('fs')

module.exports = ({
    config,
    logPath,
    mode
}) => {
    const _logPath = `${logPath}`
    const logFile = `${logPath}/webpack.config.${mode}.json`

    if (!fs.existsSync(_logPath)) {
        fs.mkdirSync(_logPath)
    }

    fs.writeFileSync(
        logFile,
        JSON.stringify(config, null, 4),
        (err) => {
            if (err) {
                throw err
            }
        }
    )
}
