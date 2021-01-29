const path = require('path')

module.exports = ({
    context,
    pkgInfo
}) => ([
    pkgInfo.names.name,
    {
        import: path.resolve(context, 'src', `${pkgInfo.names.name}.js`)
    }
])
