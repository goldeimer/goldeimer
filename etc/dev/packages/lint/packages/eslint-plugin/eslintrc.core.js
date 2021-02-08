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
        'global-require': 'off',
        indent: ['error', 4],
        'import/extensions': ['error', 'always', {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never'
        }],
        'import/prefer-default-export': ['error', 'never'],
        'max-len': ['warn', {
            code: 80,
            ignoreComments: false,
            ignoreTemplateLiterals: true,
            ignoreUrls: true
        }],
        'no-nested-ternary': 'off',
        'no-param-reassign': ['error', {
            ignorePropertyModificationsFor: ['node', 'state'],
            props: true
        }],
        // Causes massive pain during development if set to 'error'
        // (w/ eslint-loader and webpack-watcher).
        'no-unused-vars': ['warn'],
        'operator-linebreak': ['error', 'before'],
        'space-before-function-paren': ['error', {
            anonymous: 'always',
            named: 'never',
            asyncArrow: 'always'
        }],
        'spaced-comment': ['error', 'always', {
            block: {
                markers: ['!'],
                exceptions: ['*', '@__PURE__'],
                balanced: true
            },
            line: {
                markers: ['/'],
                exceptions: ['-', '+']
            }
        }],
        /// ----- replace by corresponding @babel/<rule-name> ------------------
        'new-cap': 'off',
        'no-invalid-this': 'off',
        'no-unused-expressions': 'off',
        'object-curly-spacing': 'off',
        semi: 'off'
    }
}
