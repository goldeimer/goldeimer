const HtmlPlugin = require('html-webpack-plugin')

module.exports = ({
    favicon,
    filename = 'index.html',
    primaryColor,
    subject,
    title
}) => new HtmlPlugin({
    favicon,
    filename,
    title,
    meta: {
        viewport:
            'width=device-width, initial-scale=1, shrink-to-fit=no',
        'theme-color': primaryColor,
        generator: 'webpack',
        googlebot: 'index,follow',
        rating: 'General',
        referrer: 'origin',
        robots: 'index,follow',
        subject
    },
    scriptLoading: 'defer'
})
