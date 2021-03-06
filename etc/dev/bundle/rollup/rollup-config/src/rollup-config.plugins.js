const { babel } = require('@rollup/plugin-babel')
const commonjs = require('@rollup/plugin-commonjs')
const json = require('@rollup/plugin-json')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const typescript = require('@rollup/plugin-typescript')

const namedDirectory = require('rollup-plugin-named-directory')
const nodePolyfills = require('rollup-plugin-node-polyfills')

const cjsExtensions = ['.js', '.jsx']
const mjsExtensions = ['.mjs', ...cjsExtensions]
const tsExtensions = ['.ts', '.tsx']
const anyJsExtensions = [...mjsExtensions, ...tsExtensions]
const nodeResolvedExtensions = [...anyJsExtensions, '.json']

const extensions2Matchers = (exts = []) => exts.map(
    (ext) => `<dir>/<dir>${ext}`
)

const plugins = ({ isLibrary }) => ([
    json(),
    babel({
        babelHelpers: isLibrary ? 'runtime' : 'bundled',
        exclude: [
            // TODO(Johannes): Make conditional (pnp).
            // 'node_modules/**'
        ],
        extensions: mjsExtensions,
        // include: ['src/**/*'],
        presets: ['@goldeimer']
    }),
    namedDirectory({
        matchers: extensions2Matchers(anyJsExtensions)
    }),
    nodeResolve({
        extensions: nodeResolvedExtensions,
        // TODO(Johannes):
        // Should be false.
        // rollup-plugin-node-polyfills does not ship a shim for `stream`.
        // Consider adding `stream-browserify` as a dependency (e.g.)
        // (affects: @goldeimer/react-components)
        preferBuiltins: true
    }),
    commonjs(),
    nodePolyfills()
])

module.exports = plugins
