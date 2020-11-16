const {
    paramCase,
    pascalCase
} = require('change-case')

const isProductionMode = require('../util/isProductionMode')
const isUmdBuild = require('../util/isUmdBuild')
const makeOutputPath = require('../util/makeOutputPath')

const BuildTarget = require('../enum/BuildTarget')

const libraryConfig = ({
    buildTarget,
    pkgInfo: { name, scope }
}) => {
    const scopedName = `${scope ? `${scope}-` : ''}${name}`

    const nameParamCase = paramCase(scopedName)
    const namePascalCase = pascalCase(scopedName)

    switch (buildTarget) {
    case BuildTarget.UMD:
        return {
            globalObject: 'typeof self !== "undefined" ? self : this',
            library: {
                root: namePascalCase,
                amd: nameParamCase,
                commonjs: nameParamCase
            },
            libraryTarget: 'umd',
            umdNamedDefine: true
        }

    case BuildTarget.LEGACY:
        return {
            library: nameParamCase,
            libraryTarget: 'commonjs2'
        }
    default:
        return {
            library: nameParamCase,
            libraryTarget: 'commonjs2'
        }
    }
}

const filenames = ({
    buildTarget,
    isLibrary,
    mode,
    pkgInfo: { scope }
}) => {
    const productionMode = isProductionMode(mode)
    const umdBuild = isUmdBuild(buildTarget)

    const subdir = isLibrary
        ? ''
        : 'js/'

    const hashSuffix = productionMode && !umdBuild ? '.[contenthash]' : ''
    const minSuffix = productionMode && umdBuild ? '.min' : ''
    const modeSuffix = umdBuild ? `.${mode}` : ''
    const scopePrefix = scope ? `${scope}.` : ''

    const commonSuffix = `.${buildTarget}${modeSuffix}${minSuffix}`

    return {
        chunkFilename: `${subdir}chunks/${scopePrefix}[name]${commonSuffix}${hashSuffix}.js`,
        filename: `${subdir}${scopePrefix}[name]${commonSuffix}.js`
    }
}

const formatPublicPath = ({
    pkgInfo: { name },
    publicPath
}) => publicPath.replace(
    /\[name\]/u,
    name
)

module.exports = ({
    buildTarget,
    context,
    isLibrary = false,
    mode,
    outputPath,
    pkgInfo,
    publicPath
}) => ({
    ...filenames({
        buildTarget,
        isLibrary,
        mode,
        pkgInfo
    }),
    ...libraryConfig({
        buildTarget,
        pkgInfo
    }),
    path: makeOutputPath({
        buildTarget,
        context,
        outputPath
    }),
    publicPath: formatPublicPath({
        pkgInfo,
        publicPath
    })
})
