const HtmlPlugin = require('html-webpack-plugin')

module.exports = ({
    options: {
        favicon,
        filename = 'index.html',
        subject,
        themeColor,
        title,
        ...options
    }
} = {}) => new HtmlPlugin({
    scriptLoading: 'defer',
    favicon,
    filename,
    title,
    ...options,
    meta: {
        viewport:
            'width=device-width, initial-scale=1, shrink-to-fit=no',
        'theme-color': themeColor,
        generator: 'webpack',
        googlebot: 'index,follow',
        rating: 'General',
        referrer: 'origin',
        robots: 'index,follow',
        subject,
        ...(options.meta || {})
    },
})
