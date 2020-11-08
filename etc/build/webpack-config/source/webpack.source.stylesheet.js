const path = require('path')

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
    postcss = {}
}) => ({
    module: {
        rules: [{
            test: STYLESHEET,
            use: [{
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
                    importLoaders: 1,
                    ...css
                }),
                chainedLoader('postcss-loader', postcss)
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
