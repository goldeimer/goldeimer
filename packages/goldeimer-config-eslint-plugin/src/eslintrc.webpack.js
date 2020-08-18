module.exports = {
    overrides: [{
        files: ['webpack.config.*'],
        rules: {
            'import/no-dynamic-require': ['off'],
            '@typescript-eslint/no-var-queries': ['off']
        }
    }],
    settings: {
        'import/resolver': {
            webpack: {
                // config: 'webpack.config.js'
            }
        }
    }
}
