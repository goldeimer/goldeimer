const cssnano = require('cssnano')
const postcssCalc = require('postcss-calc')
const postcssClearfix = require('postcss-clearfix')
const postcssEasings = require('postcss-easings')
const postcssImport = require('postcss-import')
const postcssNested = require('postcss-nested')
const postcssPresetEnv = require('postcss-preset-env')

module.exports = {
    plugins: [
        // TODO: Upgrade outdated Angular app to globally move to postcss 8.
        // postcssImport(),
        postcssCalc(),
        postcssClearfix(),
        // TODO: same thing, see above
        // postcssEasings(),
        // postcssNested(),
        // NOTE: `postcss-preset-env` includes `autoprefixer`.
        postcssPresetEnv(),
        ...(process.env.NODE_ENV === 'production' ? [cssnano()] : [])
    ]
}
