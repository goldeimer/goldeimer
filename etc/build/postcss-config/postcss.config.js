const cssnano = require('cssnano')
const postcssCalc = require('postcss-calc')
const postcssClearfix = require('postcss-clearfix')
const postcssCombineMediaQuery = require('postcss-combine-media-query')
// const postcssEasings = require('postcss-easings')
// const postcssImport = require('postcss-import')
// only used when not pre-processing w/ sass
// const postcssNested = require('postcss-nested')
const postcssPresetEnv = require('postcss-preset-env')

module.exports = {
    // TODO: Upgrade outdated Angular app to globally move to postcss 8.
    plugins: [
        // 'postcss-import' ought to be loaded first,
        // such as to present a complete AST to the following plugins.
        // postcssImport(),
        postcssCalc(),
        postcssClearfix(),
        postcssCombineMediaQuery(),
        // postcssEasings(),
        // postcssNested(),
        // NOTE: `postcss-preset-env` includes `autoprefixer`.
        postcssPresetEnv(),
        ...(process.env.NODE_ENV === 'production' ? [cssnano()] : [])
    ]
}
