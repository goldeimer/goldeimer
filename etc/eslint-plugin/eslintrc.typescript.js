const extensions = ['.ts', '.tsx']

module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'tsc'],
    extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb-typescript',
        'plugin:import/typescript'
    ],
    rules: {
        indent: ['off'],
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/no-unused-expressions': 'error',
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
            '@typescript-eslint/parser': extensions
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
                extensions,
                project: [
                    'etc/*/tsconfig.json',
                    'lib/*/tsconfig.json',
                    'packages/*/tsconfig.json'
                ]
            }
        }
    }
}
