/// @see https://github.com/babel/babel/blob/master/packages/babel-preset-env/src/polyfills/corejs3/built-in-definitions.js
/// @see https://github.com/browserslist/browserslist#query-composition

const { IS_VERBOSE } = require('./env')
const { isJavaScriptFile } = require('./condition')

const presetEnv = [
    '@babel/preset-env',
    {
        bugfixes: true,
        corejs: 3,
        debug: IS_VERBOSE,
        loose: true,
        modules: false,
        // TODO:
        // Test the brand-spanking-new `@babel/babel-polyfills` plugins.
        // @see [repo](https://github.com/babel/babel-polyfills)
        useBuiltIns: 'usage'
    }
]

const babelLoader = {
    test: isJavaScriptFile,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: [presetEnv, '@babel/preset-react'],
            plugins: [
                [
                    '@babel/plugin-transform-runtime',
                    {
                        'absoluteRuntime': false,
                        'corejs': false,
                        'helpers': true,
                        'regenerator': true,
                        'useESModules': true
                    }
                ],
            ],
            cacheDirectory: true,
            env: {
                production: {
                    plugins: [
                        [
                            'transform-react-remove-prop-types',
                            { removeImport: true },
                        ],
                    ],
                },
                development: {
                    plugins: ['@babel/transform-react-jsx-source']
                },
                test: {
                    // jest does not like ES6 modules :(
                    //
                    // Not that `master` holds even a single test a this point.
                    // Which, as an aside, must change in the very near future,
                    // if we intend to attempt to uphold the impression of
                    // latent professionality of the project. ;)
                    presets: [[...presetEnv][1].modules = 'commonjs']
                }
            },
        },
    },
}

module.exports = babelLoader
