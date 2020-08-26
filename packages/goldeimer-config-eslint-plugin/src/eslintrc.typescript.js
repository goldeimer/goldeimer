module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript'
    ],
    rules: {
        indent: ['off'],
        '@typescript-eslint/indent': ['error', 4],
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': 'warn',
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': 'error',
        'import/extensions': ['error', 'never'],
        // TODO: Re-enable.
        'import/prefer-default-export': ['off']
    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx']
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
                extensions: [
                    '.ts',
                    '.tsx'
                ],
                project: 'packages/*/tsconfig.json'
            }
        }
    }
}
