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
    namedDirectory(),
    nodeResolve(),
    commonjs(),
    json(),
    nodePolyfills()
])

module.exports = plugins
