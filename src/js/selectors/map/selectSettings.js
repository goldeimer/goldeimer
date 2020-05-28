import { createStructuredSelector } from 'reselect'

const selectFilter = (state) => (state.settings.map.filter)
const selectSortOrder = (state) => (state.settings.map.sort.order)
const selectSortOrderBy = (state) => (state.settings.map.sort.oderBy)

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
