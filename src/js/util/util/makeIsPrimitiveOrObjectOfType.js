const makeIsPrimitiveOrObjectOfType = (typeName) => (candidate) => (
    Object.prototype.toString.call(candidate) === `[object ${typeName}]`
)

export default makeIsPrimitiveOrObjectOfType
