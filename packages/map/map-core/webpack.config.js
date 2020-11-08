const path = require('path')

const {
    newCopyPlugin,
    newHtmlPlugin,
    withBaseConfig
} = require('@goldeimer/webpack-config')

const DIST = path.resolve(__dirname, 'dist')
const SRC = path.resolve(__dirname, 'src')

module.exports = withBaseConfig({
    name: '@goldeimer/map/map-core',
    entry: {
        map: path.resolve(
            SRC,
            'js',
            'entry',
            'StandaloneMapApp.jsx'
        )
    },
    output: {
        filename: 'static/js/[name].js',
        path: DIST,
        publicPath: '/'
    },
    plugins: [
        newCopyPlugin({
            from: path.resolve(
                SRC,
                'etc',
                '.htaccess'
            )
        }),
        newHtmlPlugin({
            favicon: path.resolve(
                SRC,
                'img',
                'favicon',
                'goldeimer.favicon.png'
            ),
            primaryColor: '#ffe300',
            subject: 'Hier bekommst Du unsere Produkte',
            title: 'Händler*innenkarte'
        })
    ],
    resolve: {

    }
})
