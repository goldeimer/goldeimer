const path = require('path')

module.exports = ({
    context,
    pkgInfo
}) => ([
    pkgInfo.name,
    {
        import: path.resolve(context, 'src', `${pkgInfo.name}.js`)
    }
])
