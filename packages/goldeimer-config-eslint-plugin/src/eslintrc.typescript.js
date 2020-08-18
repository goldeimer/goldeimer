module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    rules: {
        indent: 'off',
        '@typescript-eslint/indent': ['error', 4],
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': 'warn',
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': 'error'
    }
}
