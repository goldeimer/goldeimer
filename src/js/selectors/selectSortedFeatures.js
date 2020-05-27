import { createSelector } from 'reselect'

import sortFeatures from 'util/map/sortFeatures'

const selectFeatures = (state) => (state.features.all)
const selectSortOrder = (state) => (state.settings.sort.order)
const selectSortOrderBy = (state) => (state.settings.sort.oderBy)

const selectSortedFeatures = createSelector(
    [
        selectFeatures,
        selectSortOrder,
        selectSortOrderBy
    ],
    sortFeatures
)

export default selectSortedFeatures
