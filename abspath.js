const path = require('path')

const PROJECT_ROOT = path.resolve(__dirname)

module.exports = {
    BUILD_DIR: path.resolve(PROJECT_ROOT, 'build'),
    PROJECT_ROOT,
    PACKAGE_PATH: path.resolve(
        PROJECT_ROOT,
        'packages'
    )
}
