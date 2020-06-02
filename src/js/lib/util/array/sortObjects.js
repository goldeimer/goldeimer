import SORT_ORDER from '@lib/enum/order'

const descendingComparator = (itemA, itemB, orderBy, parentKey = null) => {
    const valueA = parentKey ? itemA[parentKey][orderBy] : itemA[orderBy]
    const valueB = parentKey ? itemB[parentKey][orderBy] : itemB[orderBy]

    if (valueA > valueB) {
        return -1
    }

    if (valueA < valueB) {
        return 1
    }

    return 0
}

const makeComparator = (order, orderBy, parentKey = null) => (
    order === SORT_ORDER.desc
        ? (itemA, itemB) => descendingComparator(
            itemA, itemB, orderBy, parentKey
        )
        : (itemA, itemB) => -1 * descendingComparator(
            itemA, itemB, orderBy, parentKey
        )
)

const stableSort = (array, comparator, itemKey = null) => {
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
    order = SORT_ORDER.asc,
    parentKey = null
) => stableSort(array, makeComparator(order, orderBy, parentKey))

export default sortObjects
