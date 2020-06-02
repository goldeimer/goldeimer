import ensureArray from '@lib/util/array/ensureArray'

const omit = (object, properties) => (
    /* eslint-disable-next-line no-eval */
    eval(
        `(({${ensureArray(properties).join(',')}, ...obj}) => obj)(object)`
    )
)

export default omit
