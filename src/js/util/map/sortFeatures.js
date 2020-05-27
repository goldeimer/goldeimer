import SORT_ORDER from 'enum/sortOrder'

const descendingComparator = (itemA, itemB, orderBy) => {
    const valueA = itemA[orderBy]
    const valueB = itemB[orderBy]

    if (valueA > valueB) {
        return -1
    }

    if (valueA < valueB) {
        return 1
    }

    return 0
}

const makeComparator = (order, orderBy) => (
    order === SORT_ORDER.desc
        ? (itemA, itemB) => descendingComparator(itemA, itemB, orderBy)
        : (itemA, itemB) => -1 * descendingComparator(itemA, itemB, orderBy)
)

const stableSort = (array, comparator, itemKey = null) => {
    const stabilizedArray = array.map((item, index) => [item, index])
    stabilizedArray.sort((itemA, itemB) => {
        const valueObjectA = itemKey !== null ? itemA[0][itemKey] : itemA[0]
        const valueObjectB = itemKey !== null ? itemB[0][itemKey] : itemB[0]

        const comparisonResult = comparator(valueObjectA, valueObjectB)

        return comparisonResult !== 0 ? comparisonResult : itemA[1] - itemB[1]
    })

    return stabilizedArray.map((item) => item[0])
}

const sortFeatures = (
    features,
    order = SORT_ORDER.asc,
    orderBy = 'name'
) => {
    if (features === null) {
        return features
    }

    return stableSort(features, makeComparator(order, orderBy), 'properties')
}

export default sortFeatures
