import {
    CustomWebpackBrowserSchema,
    TargetOptions
} from '@angular-builders/custom-webpack'

const { merge } = require('webpack-merge')
const path = require('path')

const {
    newCopyPlugin,
    newDefinePlugin,
    newHtmlPlugin,
    withBaseConfig
} = require('@goldeimer/webpack-config')

const pkg = require('./package.json')

const SRC = path.resolve(__dirname, 'src')

module.exports = (
    config,
    options,
    targetOptions
) => {
    withBaseConfig({
        name: '@goldeimer/abenteuer-regenwald-campaign',
        plugins: [
            newCopyPlugin({
                from: path.resolve(
                    SRC,
                    'backend-wordpress-plugin'
                )
            }),
            newHtmlPlugin({
                favicon: path.resolve(
                    SRC,
                    'img',
                    'favicon',
                    'goldeimer.favicon.png'
                ),
                filename: 'webpack.html',
                primaryColor: '#ffe300',
                subject: 'Goldeimers "Keinebaeume" Kampagne in Zusammenarbeit mit Abenteuer Regenwald',
                title: 'Keinebaeume'
            }),
            newDefinePlugin({
                pkg
            })
        ]
    })
}
