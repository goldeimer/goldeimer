import { createStructuredSelector } from 'reselect'

const selectFilter = (state) => (state.map.filter)
const selectSortOrder = (state) => (state.map.sort.order)
const selectSortOrderBy = (state) => (state.map.sort.oderBy)

const selectSortSettings = createStructuredSelector({
    order: selectSortOrder,
    orderBy: selectSortOrderBy
})

export {
    selectFilter,
    selectSortOrder,
    selectSortOrderBy,
    selectSortSettings
}
