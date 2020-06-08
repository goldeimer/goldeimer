/// 'development' mode builds fail on error
/// 'production' mode builds fail on warn

module.exports = {
    extends: [
        'airbnb',
        'airbnb/hooks',
        'standard',
        'standard-react'
    ],
    rules: {
        'arrow-parens': ['error', 'always'],
        'global-require': ['off'],
        indent: ['error', 4],
        'max-len': ['warn', {
            code: 80,
            ignoreComments: false,
            ignoreTemplateLiterals: true,
            ignoreUrls: true,
        }],
        'no-nested-ternary': ['off'],
        'no-param-reassign': ['error', {
            ignorePropertyModificationsFor: ['state'],
            props: true,
        }],
        // Causes massive pain during development if set to 'error'
        // (w/ eslint-loader and webpack-watcher).
        'no-unused-vars': ['warn'],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-props-no-spreading': ['off'],
        semi: ['error', 'never', {
            beforeStatementContinuationChars: 'always'
        }],
        'spaced-comment': ['error', 'always', {
            line: {
                markers: ['/'],
                exceptions: ['-', '+']
            },
            block: {
                markers: ['!'],
                exceptions: ['*'],
                balanced: true
            }
        }]
    },
    plugins: [
        'eslint-plugin-compat',
        'eslint-plugin-node',
        'eslint-plugin-promise'
    ],
    settings: {
        'import/resolver': {
            webpack: {
                 config: 'webpack/webpack.config.js',
            }
        }
    },
    env: {
        browser: true,
        es6: true,
        jest: true
    }
}
