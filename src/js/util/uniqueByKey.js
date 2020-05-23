import ensureArray from './ensureArray'

const compareByValues = (objectA, objectB, keys) => {
    let isMatch = true

    keys.forEach((key) => {
        if (!isMatch) {
            return
        }

        isMatch = objectA[key] === objectB[key]
    })

    return isMatch
}

const uniqueByKey = (array, keysArg) => {
    const keys = ensureArray(keysArg)

    return array.filter(
        (object, index, filteredArray) => (
            filteredArray.findIndex(
                (other) => compareByValues(object, other, keys)
            ) === index
        )
    )
}

export default uniqueByKey
