import ensureArray from 'util/ensureArray'
import isArray from 'util/isArray'
import log from 'util/log'

const unpack = (object, nestedKeys) => {
    let value = object

    try {
        nestedKeys.forEach((key) => { value = object[key] })
    } catch (error) {
        log(error)
    }

    return value
}

const compareByValues = (objectA, objectB, keys) => {
    let isMatch = true

    keys.forEach((key) => {
        if (!isMatch) {
            return
        }

        // If the "key" is an array, the caller wants to sort by more deeply
        // nested a value.
        const isNested = isArray(key)
        const valueA = isNested ? unpack(objectA, key) : objectA[key]
        const valueB = isNested ? unpack(objectB, key) : objectB[key]

        isMatch = valueA === valueB
    })

    return isMatch
}

const uniqueByKey = (array, keysArg) => {
    const keys = ensureArray(keysArg)

    return array.filter(
        (object, index, newArray) => (
            newArray.findIndex(
                (existing) => compareByValues(object, existing, keys)
            ) === index
        )
    )
}

export default uniqueByKey
