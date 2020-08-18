import { isObject } from 'typechecker'

const add = (acc, obj) => Object.fromEntries(
    Object.entries(obj).map(([k, v]) => {
        if (isObject(v)) {
            return [k, add((acc[k] || {}), v)]
        }

        return [k, (acc[k] || 0) + v]
    })
)

const summateObjects = (arr, key) => arr.reduce(
    (acc, el) => add(acc, key ? el[key] : el),
    {}
)

export default summateObjects
