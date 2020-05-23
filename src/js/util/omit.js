import ensureArray from './ensureArray'

const omit = (object, properties) => (
    eval(
        `(({${ensureArray(properties).join(',')}, ...object}) => object)(obj)`
    )
)

export default omit
