module.exports = {
    'extends': ['airbnb', 'standard', 'standard-react'],
    'rules': {
        'arrow-parens': ['error', 'always'],
        'global-require': ['off'],
        'indent': ['error', 4],
        'max-len': ['error', {
            'code': 80,
            'ignoreComments': false,
            'ignoreTemplateLiterals': true,
            'ignoreUrls': true,
        }],
        'no-nested-ternary': ['off'],
        'no-param-reassign': ['error', {
            'ignorePropertyModificationsFor': ['state'],
            'props': true,
        }],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-props-no-spreading': ['off'],
        'semi': ['error', 'never', {
            'beforeStatementContinuationChars': 'always'
        }],
        'spaced-comment': ['error', 'always', {
            'line': {
                'markers': ['/'],
                'exceptions': ['-', '+']
            },
            'block': {
                'markers': ['!'],
                'exceptions': ['*'],
                'balanced': true
            }
        }]
    },
    'settings': {
        'import/resolver': {
            'webpack': {
                 'config': 'webpack/webpack.config.js',
            }
        }
    },
    'env': {
        'browser': true,
        'es6': true,
        'jest': true,
    }
}
