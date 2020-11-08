module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'tsc'],
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
        'tsc/config': ['error', {
            configFile: path.resolve(
                PROJECT_ROOT,
                'tsconfig.json'
            )
        }]
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
                project: [
                    'etc/*/tsconfig.json',
                    'lib/*/tsconfig.json',
                    'packages/*/tsconfig.json'
                ]
            }
        }
    }
}
