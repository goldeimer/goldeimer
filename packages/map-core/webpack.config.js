// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path')

const SRC = path.resolve(__dirname, 'src')

const {
    newWebpackConfigBuilder,
    SourceType
} = require('@goldeimer/webpack-config')

const builder = newWebpackConfigBuilder(__dirname)

builder.loadSource(SourceType.FONT)
builder.loadSource(SourceType.JAVASCRIPT)
builder.loadSource(SourceType.RASTER_IMAGE)
builder.loadSource(SourceType.STYLESHEET)
builder.loadSource(SourceType.VECTOR_IMAGE)

// builder.setOutputPath('static')
// builder.setPublicPath('/wp-content/themes/[name]/static/')

builder.copy({
    from: path.resolve(
        SRC,
        'etc',
        '.htaccess'
    )
})

// TODO(Johannes): This should be configurable.
builder.html({
    // favicon: '@goldeimer/img-asset-lib/favicon/goldeimer.favicon.png',
    primaryColor: '#ffe300',
    subject: 'Hier bekommst Du unsere Produkte',
    title: 'Händler*innenkarte'
})

module.exports = (...args) => builder.build(...args)
