const {
    webpackConfig
} = require('@goldeimer/webpack-config')

module.exports = webpackConfig({
    entry: './src/compare-commits.js',
    target: 'node',
    alias: {
        md$: 'src/template/md'
    }
})
