import { SortOrder } from '@goldeimer/data-util'

const getValue = (item, key, parentKey = null) => {
    const tmp = parentKey !== null ? getValue(item, parentKey) : item

    if (!tmp) {
        return undefined
    }

    return tmp[key]
}

const descendingComparator = (itemA, itemB, orderBy, parentKey = null) => {
    const valueA = getValue(itemA, orderBy, parentKey)
    const valueB = getValue(itemB, orderBy, parentKey)

    if (valueA < valueB) {
        return 1
    }

    if (valueA > valueB) {
        return -1
    }

    return 0
}

const makeComparator = (order, orderBy, parentKey = null) => (
    order === SortOrder.DESC
        ? (itemA, itemB) => descendingComparator(
            itemA, itemB, orderBy, parentKey
        )
        : (itemA, itemB) => -1 * descendingComparator(
            itemA, itemB, orderBy, parentKey
        )
)

const stableSort = (array, comparator) => {
    const stabilizedArray = array.map((item, index) => [item, index])
    stabilizedArray.sort((itemA, itemB) => {
        const comparisonResult = comparator(itemA[0], itemB[0])

        return comparisonResult !== 0 ? comparisonResult : itemA[1] - itemB[1]
    })

    return stabilizedArray.map((item) => item[0])
}

const sortObjects = (
    array,
    orderBy,
    order = SortOrder.ASC,
    parentKey = null
) => stableSort(array, makeComparator(order, orderBy, parentKey))

export default sortObjects
