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
                extensions: [
                    '.js',
                    '.jsx',
                    '.ts',
                    '.tsx'
                ]
                // config: 'webpack.config.js'
            }
        }
    }
}
