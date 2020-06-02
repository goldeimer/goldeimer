const transformProperties = (obj, transform) => Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, transform(value, key)])
)

export default transformProperties
