const { babel } = require('@rollup/plugin-babel')
const commonjs = require('@rollup/plugin-commonjs')
const json = require('@rollup/plugin-json')
const { nodeResolve } = require('@rollup/plugin-node-resolve')

const namedDirectory = require('rollup-plugin-named-directory')
const nodePolyfills = require('rollup-plugin-node-polyfills')

const extensions = ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx']

const extensions2Matchers = (exts = []) => exts.map(
    (ext) => `<dir>/<dir>${ext}`
)

const plugins = ({ isLibrary }) => ([
    typescript(),
    babel({
        babelHelpers: isLibrary ? 'runtime' : 'bundled',
        exclude: 'node_modules/**',
        extensions,
        // include: ['src/**/*'],
        presets: ['@goldeimer']
    }),
    namedDirectory({
        matchers: extensions2Matchers(extensions)
    }),
    nodeResolve({
        extensions,
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
