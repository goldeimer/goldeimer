/// @file babel.config
///
/// @see [github | babel-preset-env/corejs3/built-in](corejs-built-ins)
/// @see [browserslist | query composition](browserslist-query)

// TODO: Set via env?
const CORE_JS_VERSION = 3.6

const PRESET_ENV = ['@babel/preset-env', {
    bugfixes: true,
    corejs: CORE_JS_VERSION,
    debug: false,
    loose: true,
    // babel *must* leave ES6 modules as they are,
    // such that webpack can make tree-shaking happen.
    modules: false,
    // TODO: Pending decisions:
    // ------------------------
    // 1. `corejs: 3.X, shippedProposals: true` (current)
    //    or `corejs: { version: 3.X, proposals: true }`
    //
    // 2. Evaluate the brand-spanking-new `@babel/babel-polyfills` plugin(s).
    //
    // @see 1. Check the [@babel/babel-polyfills repo](babel-polyfills-repo).
    //      2. The latter would enable further futuristic features, but likely
    //         also bloat the package. Measure. Once priorities permit.
    shippedProposals: true,
    useBuiltIns: 'usage'
}]

module.exports = {
    plugins: [
        [
            '@babel/plugin-transform-runtime', {
                absoluteRuntime: false,
                bugfixes: true,
                // - `preset-env` adds `corejs^3` to the configuration
                // - the below setting affects the transform-runtime plugin itself, the
                //   preset however remains entirely oblivious and couldn't care less
                corejs: false,
                helpers: true,
                regenerator: true,
                useESModules: true
            }
        ],
        '@babel/plugin-transform-unicode-regex',
        '@babel/plugin-proposal-class-properties'
    ],
    presets: [
        PRESET_ENV,
        '@babel/preset-react'
    ],
    env: {
        production: {
            plugins: [
                [
                    '@babel/transform-react-remove-prop-types',
                    { removeImport: true }
                ]
            ]
        },
        development: {
            plugins: ['@babel/transform-react-jsx-source']
        },
        test: {
            // jest does not play well w/ ES6 modules :(
            // (Not that coverage is worth mentioning at this point.)
            presets: [[...PRESET_ENV][1].modules = 'commonjs']
        }
    }
}

// [babel-polyfills-doc-corejs]: https://babeljs.io/docs/en/babel-preset-env#corejs
// [babel-polyfills-repo]: https://github.com/babel/babel-polyfills
