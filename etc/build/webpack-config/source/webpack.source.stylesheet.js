const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { STYLESHEET } = require('../enum/WebpackRuleTest')

const chainedLoader = (name, options = {}) => ({
    loader: name,
    options: merge(options, { sourceMap: true })
})

// TODO:
// consider using the `media-query-splitting-plugin`
module.exports = ({
    useCssModules = false,
    css = {},
    postcss = {},
    sass = {}
}) => ({
    module: {
        rules: [{
            test: STYLESHEET,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        modules: {
                            namedExport: true
                        },
                        // publicPath: (resourcePath, context) => `${path.relative(
                        //     path.dirname(resourcePath),
                        //     context
                        // )}/`
                    }
                },
                chainedLoader('css-loader', {
                    modules: useCssModules ? { auto: true } : false,
                    importLoaders: 2,
                    ...css
                }),
                chainedLoader('postcss-loader', postcss),
                chainedLoader('sass-loader', sass)
            ]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            chunkFilename: 'static/css/[name].css',
            filename: 'static/css/[name].css'
        })
    ]
})
