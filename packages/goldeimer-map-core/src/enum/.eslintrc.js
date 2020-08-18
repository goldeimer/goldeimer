module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: true
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
        ...[
            'base',
            'lang.babel',
            'lang.typescript',
            'lang.react',
            'overrides'
        ].map(abspath),
    ],
    parser: '@typescript-eslint/parser',
    parserOptions:  {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    root: true,
    rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn'
    }
}
