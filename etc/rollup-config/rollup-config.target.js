const { BuildTarget } = require('@goldeimer/build-util')

const cjsConfig = ({ info }) => ({
    output: {
        file: info.main,
        format: 'cjs'
    }
})

const esmConfig = ({ info }) => ({
    output: {
        file: info.module,
        format: 'es'
    }
})

const umdConfig = ({ info }) => ({
    output: {
        file: info.browser,
        format: 'umd',
        name: info.names.scopedName
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
