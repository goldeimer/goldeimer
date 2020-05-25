import isArray from 'util/isArray'

const ensureArray = (arg) => (isArray(arg) ? arg : [arg])

export default ensureArray
