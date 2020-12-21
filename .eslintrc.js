// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path')

module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: true
    },
    extends: ['plugin:@goldeimer/all'],
    settings: {
        'import/resolver': {
            'eslint-import-resolver-lerna': {
                packages: [
                    path.resolve(__dirname, 'etc')
                ]
            }
        }
    }
}
