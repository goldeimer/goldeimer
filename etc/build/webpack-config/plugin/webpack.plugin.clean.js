const { CleanWebpackPlugin: CleanPlugin } = require('clean-webpack-plugin')

module.exports = () => new CleanPlugin({
    cleanAfterEveryBuildPatterns: [
        '**/css/**/*.js'
    ],
    cleanOnceBeforeBuildPatterns: [
        '**/*',
        '!**/bundle-analyzer.*.html',
        '!esm',
        '!esm/*',
        '!legacy',
        '!legacy/*',
        '!stats/',
        '!stats/*',
        '!umd',
        '!umd/*',
        '!*umd.development.js',
        '!*umd.production.min.js'
    ],
    cleanStaleWebpackAssets: false
})
