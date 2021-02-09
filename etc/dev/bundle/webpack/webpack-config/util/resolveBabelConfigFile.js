const path = require('path')

const { findPackageData } = require('@babel/core/lib/config/files/package')

const {
    findRelativeConfig,
    findRootConfig
} = require('@babel/core/lib/config/files/configuration')

const isGenerator = (val) => (
    val
    && typeof val === 'object'
    && typeof val.next === 'function'
)

const getResult = (valueOrIterator) => {
    if (!isGenerator(valueOrIterator)) {
        return valueOrIterator;
    }

    let result = valueOrIterator.next()
    while (!result.done) {
        result = valueOrIterator.next()
    }

    return result.value
}

const resolveBabelConfigFile = (contextPath, environmentName) => {
    const packageData = getResult(findPackageData(contextPath))
    packageData.directories.push(packageData.filepath)

    const resolvedRelativeConfig = getResult(
        findRelativeConfig(
            packageData,
            environmentName
        )
    )

    const resolvedRootConfig = getResult(
        findRootConfig(
            packageData.filepath,
            environmentName
        )
    )

    // babel.config.js
    if (resolvedRootConfig && resolvedRootConfig.filepath) {
        return resolvedRootConfig.filepath
    }

    // .babelrc.js and .babelrc
    if (resolvedRelativeConfig && resolvedRelativeConfig.config) {
        return resolvedRelativeConfig.config.filepath
    }

    console.info(
        'Did not find a project-specific babel configuration.'
        + ' Using @goldeimer/babel-preset.'
    )

    return '@goldeimer/babel-preset'
}

module.exports = resolveBabelConfigFile
