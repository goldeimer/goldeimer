const {
    paramCase,
    pascalCase
} = require('change-case')

const isProductionMode = require('../util/isProductionMode')
const isUmdBuild = require('../util/isUmdBuild')
const outputPath = require('../util/outputPath')

const BuildTarget = require('../enum/BuildTarget')

const libraryConfig = ({
    buildTarget,
    pkgInfo: { name, scope }
}) => {
    const _name = `${scope ? `${scope}-` : ''}${name}`

    const nameParamCase = paramCase(_name)
    const namePascalCase = pascalCase(_name)

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
    }

    return {
        library: nameParamCase,
        libraryTarget: 'commonjs2'
    }
}

const filenames = ({
    buildTarget,
    isLibrary,
    mode,
    pkgInfo
}) => {
    const _isProductionMode = isProductionMode(mode)
    const _isUmdBuild = isUmdBuild(buildTarget)

    const subdir = isLibrary
        ? ''
        : 'static/js/'

    const hashSuffix = _isProductionMode && !_isUmdBuild ? '.[contenthash]' : ''
    const minSuffix = _isProductionMode && _isUmdBuild ? '.min' : ''
    const modeSuffix = _isUmdBuild ? `.${mode}` : ''
    const scopePrefix = pkgInfo.scope ? `${pkgInfo.scope}.` : ''

    const commonSuffix = `.${buildTarget}${modeSuffix}${minSuffix}`

    return {
        chunkFilename: `${subdir}chunks/${scopePrefix}[name]${commonSuffix}${hashSuffix}.js`,
        filename:  `${subdir}${scopePrefix}[name]${commonSuffix}.js`,
    }
}

module.exports = ({
    buildTarget,
    context,
    isLibrary = false,
    mode,
    pkgInfo,
    publicPath,
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
    path: outputPath({
        buildTarget,
        context
    }),
    publicPath
})
