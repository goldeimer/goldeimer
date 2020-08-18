module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: true
    },
    extends: [
        'plugin:@goldeimer-config/core',
        'plugin:@goldeimer-config/babel',
        'plugin:@goldeimer-config/googleappsscript',
        'plugin:@goldeimer-config/react',
        'plugin:@goldeimer-config/typescript',
        'plugin:@goldeimer-config/webpack'
    ]
}
