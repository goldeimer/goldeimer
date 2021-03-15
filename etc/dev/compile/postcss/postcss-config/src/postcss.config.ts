import cssnano from 'cssnano'
import postcssCalc from 'postcss-calc'
import postcssClearfix from 'postcss-clearfix'
import postcssCombineMediaQuery from 'postcss-combine-media-query'
// import postcssEasings from 'postcss-easings'
// import postcssImport from 'postcss-import'
// only used when not pre-processing w/ sass
// import postcssNested from 'postcss-nested'
import postcssPresetEnv from 'postcss-preset-env'

export const postCssConfig = () => ({
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
})
