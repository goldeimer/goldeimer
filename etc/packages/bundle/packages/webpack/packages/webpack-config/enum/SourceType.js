const SourceType = {
    FONT: 'font',
    JAVASCRIPT: 'javascript',
    RASTER_IMAGE: 'img.raster',
    STYLESHEET: 'stylesheet',
    TEXT: 'text',
    TYPESCRIPT: 'typescript',
    VECTOR_IMAGE: 'img.vector'
}

const Configs = {
    [SourceType.FONT]: () => (
        require('../source/webpack.source.font')
    ),
    [SourceType.JAVASCRIPT]: () => (
        require('../source/webpack.source.javascript')
    ),
    [SourceType.RASTER_IMAGE]: () => (
        require('../source/webpack.source.img-raster')
    ),
    [SourceType.STYLESHEET]: () => (
        require('../source/webpack.source.stylesheet')
    ),
    [SourceType.TEXT]: () => (
        require('../source/webpack.source.text')
    ),
    [SourceType.TYPESCRIPT]: () => (
        require('../source/webpack.source.typescript')
    ),
    [SourceType.VECTOR_IMAGE]: () => (
        require('../source/webpack.source.img-vector')
    )
}

const getLoaderConfig = ({
    context,
    mode,
    options = {},
    sourceType
}) => (
    Configs[sourceType]
        ? Configs[sourceType]()({
            ...options,
            context,
            mode
        })
        : {}
)

module.exports = {
    ...SourceType,
    getLoaderConfig
}
