const {
    isUmdBuild,
    BuildTarget
} = require('@goldeimer/compile-util')

const {
    paramCase,
    pascalCase
} = require('change-case')

const isProductionMode = require('../util/isProductionMode')
const makeOutputPath = require('../util/makeOutputPath')

const libraryConfig = ({
    buildTarget,
    isLibrary,
    libraryTarget,
    pkgInfo: { names: { scopedName } }
}) => {
    if (libraryTarget) {
        return libraryTarget
    }

    if (!isLibrary) {
        return {}
    }

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

    case BuildTarget.ESM:
        return {
            libraryTarget: 'module',
            module: true
        }

    default:
        return {
            libraryTarget: 'commonjs2'
        }
    }
}

const filenames = ({
    buildTarget,
    isLibrary,
    mode,
    pkgInfo: { names: { scope } }
}) => {
    const productionMode = isProductionMode(mode)
    const umdBuild = isUmdBuild(buildTarget)

    const subdir = isLibrary
        ? ''
        : 'js/'

    const hashSuffix = productionMode && !umdBuild ? '.[contenthash]' : ''
    const minSuffix = productionMode && umdBuild ? '.min' : ''
    const modeSuffix = umdBuild ? `.${mode}` : ''
    const scopePrefix = scope ? `${scope}-` : ''

    const commonSuffix = `.${buildTarget}${modeSuffix}${minSuffix}`

    return {
        assetModuleFilename: `asset/${scopePrefix}[name].[contenthash][ext]`,
        chunkFilename: `${subdir}chunks/${scopePrefix}[name]${commonSuffix}${hashSuffix}.js`,
        filename: `${subdir}${scopePrefix}[name]${commonSuffix}.js`
    }
}

const formatPublicPath = ({
    pkgInfo: { names: { name } },
    publicPath
}) => publicPath.replace(
    /\[name\]/u,
    name
)

module.exports = ({
    buildTarget,
    context,
    isLibrary = false,
    libraryTarget,
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
        isLibrary,
        libraryTarget,
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
