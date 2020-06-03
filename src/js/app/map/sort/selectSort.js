import { createStructuredSelector } from 'reselect'

const selectSortOrder = (state) => (state.map.sort.order)
const selectSortOrderBy = (state) => (state.map.sort.oderBy)

const selectSort = createStructuredSelector({
    order: selectSortOrder,
    orderBy: selectSortOrderBy
})

export default selectSort
