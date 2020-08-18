const binaryIndexOf = (items, value) => {
    let minIndex = 0
    let maxIndex = items.length - 1
    let currentIndex
    let currentValue

    while (minIndex <= maxIndex) {
        /* eslint-disable-next-line no-bitwise */
        currentIndex = (minIndex + maxIndex) / 2 | 0
        currentValue = items[currentIndex]

        if (currentValue < value) {
            minIndex = currentIndex + 1
        } else if (currentValue > value) {
            maxIndex = currentIndex - 1
        } else {
            return currentIndex
        }
    }

    return -1
}

export default binaryIndexOf
