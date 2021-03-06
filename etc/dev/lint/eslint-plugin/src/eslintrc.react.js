module.exports = {
    extends: [
        'plugin:react/recommended',
        'airbnb/hooks',
        'standard-react'
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        }
    },
    plugins: [
        'jsx-a11y',
        'react'
    ],
    rules: {
        'no-restricted-imports': ['error', {
            patterns: [
                '@material-ui/*/*/*',
                '!@material-ui/core/test-utils/*'
            ]
        }],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-props-no-spreading': ['off']
    },
    settings: {
        react: {
            linkComponents: [
                { name: 'Link', linkAttribute: 'to' }
            ],
            pragma: 'React',
            propWrapperFunctions: [
                'exact',
                'forbidExtraProps',
                { object: 'Object', property: 'freeze' }
            ],
            version: 'detect'
        }
    }
}
