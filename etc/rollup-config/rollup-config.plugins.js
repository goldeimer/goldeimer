const { babel } = require('@rollup/plugin-babel')
const commonjs = require('@rollup/plugin-commonjs')
const json = require('@rollup/plugin-json')
const { nodeResolve } = require('@rollup/plugin-node-resolve')

const namedDirectory = require('rollup-plugin-named-directory')
const nodePolyfills = require('rollup-plugin-node-polyfills')

const plugins = ({ isLibrary }) => ([
    babel({
        babelHelpers: isLibrary ? 'runtime' : 'bundled',
        exclude: 'node_modules/**',
        presets: ['@goldeimer']
    }),
    namedDirectory({
        matchers: [
            '<dir>/<dir>.js',
            '<dir>/<dir>.jsx'
        ]
    }),
    nodeResolve({
        extensions: ['.mjs', '.js', '.jsx', '.json'],
        // TODO(Johannes):
        // Should be false.
        // rollup-plugin-node-polyfills does not ship a shim for `stream`.
        // Consider adding `stream-browserify` as a dependency (e.g.)
        // (affects: @goldeimer/react-components)
        preferBuiltins: true
    }),
    commonjs(),
    json(),
    nodePolyfills()
])

module.exports = plugins
