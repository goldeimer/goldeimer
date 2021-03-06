// const { BuildTarget } = require('@goldeimer/compile-util')

const BuildTarget = {
    CJS: 'cjs',
    ESM: 'esm',
    UMD: 'umd'
}


const getOutFileName = (info, {
    expKey = 'require',
    nameKey = 'main'
} = {}) => {
    if (info.exports) {
        if (info.exports['.']) {
            if (info.exports['.'][expKey]) {
                return info.exports['.'][expKey]
            }

            return info.exports['.']
        }

        return info.exports
    }

    return info[nameKey]
}

const cjsConfig = ({ info }) => ({
    output: {
        file: getOutFileName(info),
        format: 'cjs',
        sourcemap: true
    }
})

const esmConfig = ({ info }) => ({
    output: {
        file: getOutFileName(info, {
            expKey: 'import',
            nameKey: 'module'
        }),
        format: 'es',
        sourcemap: true
    }
})

const umdConfig = ({ info }) => ({
    output: {
        file: info.browser,
        format: 'umd',
        name: info.names.scopedName,
        sourcemap: true
    }
})

const targetConfig = ({
    info,
    target
}) => {
    switch (target) {
    case BuildTarget.ESM:
        return esmConfig({ info })

    case BuildTarget.UMD:
        return umdConfig({ info })

    default:
        return cjsConfig({ info })
    }
}

module.exports = targetConfig
