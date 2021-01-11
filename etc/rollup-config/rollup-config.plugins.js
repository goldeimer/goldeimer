const { babel } = require('@rollup/plugin-babel')
const commonjs = require('@rollup/plugin-commonjs')
const json = require('@rollup/plugin-json')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const typescript = require('@rollup/plugin-typescript')

const namedDirectory = require('rollup-plugin-named-directory')
const nodePolyfills = require('rollup-plugin-node-polyfills')

const extensions = ['.mjs', '.js', '.jsx', '.ts', '.tsx']
const nodeExtensions = ['.json', ...extensions]

const extensions2Matchers = (exts = []) => exts.map(
    (ext) => `<dir>/<dir>${ext}`
)

const plugins = ({ isLibrary }) => ([
    typescript(),
    json(),
    babel({
        babelHelpers: isLibrary ? 'runtime' : 'bundled',
        exclude: [
            'node_modules/**',
            '**/*.json'
        ],
        extensions,
        // include: ['src/**/*'],
        presets: ['@goldeimer']
    }),
    namedDirectory({
        matchers: extensions2Matchers(extensions)
    }),
    nodeResolve({
        nodeExtensions,
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
