const HtmlPlugin = require('html-webpack-plugin')

module.exports = ({
    favicon,
    primaryColor,
    subject,
    title
}) => new HtmlPlugin({
    favicon,
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
