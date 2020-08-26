const { DefinePlugin } = require('webpack')

module.exports = ({
    pkg: {
        version = '0.0.0'
    }
}) => new DefinePlugin({
    APP_VERSION: JSON.stringify(version)
})
