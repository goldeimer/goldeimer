/// @see https://github.com/babel/babel/blob/master/packages/babel-preset-env/src/polyfills/corejs3/built-in-definitions.js
/// @see https://github.com/browserslist/browserslist#query-composition

const isDevBuild = require('./isDevBuild')
const { isJavaScriptFile } = require('./condition')

const targetsByUsageStats = '> 0.5% in DE, > 0.5% in AT, > 0.5% in CH'
const targetConditions = 'last 2 versions, Firefox ESR, not dead'

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
                        debug: !isDevBuild(),
                        loose: true,
                        modules: false,
                        targets: `${targetsByUsageStats}, ${targetConditions}`,
                        useBuiltIns: 'usage',
                        include: [
                            'es.map',
                            'es.set',
                            'es.array.iterator',
                            'es.number.to-fixed',
                            'es.object.assign',
                            'es.object.entries',
                            'es.object.from-entries',
                            'es.object.keys',
                            'es.promise',
                            'es.string.trim',
                        ]
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
                    }
                ]
            ],
            cacheDirectory: true,
        },
    },
}

module.exports = babelLoader
