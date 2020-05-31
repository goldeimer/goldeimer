import ensureArray from 'util/array/ensureArray'
import log from 'util/log'

const unpack = (obj, nestedKeys) => {
    let value = obj

    try {
        nestedKeys.forEach((key) => { value = obj[key] })
    } catch (error) {
        log(error)
    }

    return value
}

const compareByValues = (objA, objB, keys) => {
    let isMatch = true

    keys.forEach((key) => {
        if (!isMatch) {
            return
        }

        // If the "key" is an array, the caller wants to sort by more deeply
        // nested a value.
        const isNested = Array.isArray(key)
        const valueA = isNested ? unpack(objA, key) : objA[key]
        const valueB = isNested ? unpack(objB, key) : objB[key]

        isMatch = valueA === valueB
    })

    return isMatch
}

const uniqueByKey = (array, keysArg) => {
    const keys = ensureArray(keysArg)

    return array.filter(
        (obj, index, newArray) => (
            newArray.findIndex(
                (existing) => compareByValues(obj, existing, keys)
            ) === index
        )
    )
}

export default uniqueByKey
