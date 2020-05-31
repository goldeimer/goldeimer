/// @see https://github.com/babel/babel/blob/master/packages/babel-preset-env/src/polyfills/corejs3/built-in-definitions.js
/// @see https://github.com/browserslist/browserslist#query-composition

const { IS_PRODUCTION_BUILD } = require('./buildEnv')
const { isJavaScriptFile } = require('./condition')

const developmentPlugins = IS_PRODUCTION_BUILD
    ? []
    : ['transform-react-jsx-source']

const babelLoader = {
    test: isJavaScriptFile,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        bugfixes: true,
                        corejs: 3,
                        debug: !IS_PRODUCTION_BUILD,
                        loose: true,
                        modules: false,
                        useBuiltIns: 'usage'
                    }
                ],
                '@babel/preset-react',
            ],
            plugins: [
                [
                    '@babel/plugin-transform-runtime',
                    {
                        'absoluteRuntime': false,
                        'corejs': false,
                        'helpers': true,
                        'regenerator': true,
                        'useESModules': true
                    },
                    ...developmentPlugins
                ]
            ],
            cacheDirectory: true,
//             env: {
//                 production: {
//                     plugins: [
//                         [
//                             'transform-react-remove-prop-types',
//                             { removeImport: true },
//                         ],
//                     ],
//                 },
//             },
        },
    },
}

module.exports = babelLoader
