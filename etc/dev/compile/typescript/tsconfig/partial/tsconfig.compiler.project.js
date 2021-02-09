export default ({ transpiler }) => ({
    allowJs: true,
    checkJs: true,
    composite: false,
    declaration: false,
    declarationMap: false,
    downlevelIteration: true,
    importHelpers: true,
    incremental: false,
    isolatedModules: transpiler === 'babel',
    jsx: 'react',
    lib: [
        'DOM',
        'ES2015',
        'ES2016',
        'ES2017',
        'ES2018',
        'ES2019',
        'ES2020',
        'ESNext',
        'WebWorker'
    ],
    module: 'ES2015',
    plugins: [{
        name: 'typescript-eslint-language-service'
    }, {
        name: 'typescript-styled-plugin'
    }],
    removeComments: true,
    sourceMap: true,
    target: 'ES2015'
})
