module.exports = {
    /// ----- sane defaults via presets & plugins ------------------------------
    extends: [
        'eslint:recommended',
        'airbnb',
        'standard'
    ],
    plugins: [
        'compat',
        'import',
        'node',
        'promise'
    ],
    reportUnusedDisableDirectives: true,
    /// ----- customized linting rules -----------------------------------------
    rules: {
        'arrow-parens': ['error', 'always'],
        'global-require': ['off'],
        indent: ['error', 4],
        'max-len': ['warn', {
            code: 80,
            ignoreComments: false,
            ignoreTemplateLiterals: true,
            ignoreUrls: true
        }],
        'no-nested-ternary': ['off'],
        'no-param-reassign': ['error', {
            ignorePropertyModificationsFor: ['node', 'state'],
            props: true
        }],
        // Causes massive pain during development if set to 'error'
        // (w/ eslint-loader and webpack-watcher).
        'no-unused-vars': ['warn'],
        'operator-linebreak': ['error', 'before'],
        semi: ['error', 'never', {
            beforeStatementContinuationChars: 'always'
        }],
        'space-before-function-paren': ['error', {
            anonymous: 'always',
            named: 'never',
            asyncArrow: 'always'
        }],
        'spaced-comment': ['error', 'always', {
            block: {
                markers: ['!'],
                exceptions: ['*'],
                balanced: true
            },
            line: {
                markers: ['/'],
                exceptions: ['-', '+']
            }
        }]
    }
}
