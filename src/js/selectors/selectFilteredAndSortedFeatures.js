import { createSelector } from 'reselect'

import sortFeatures from 'util/map/sortFeatures'
import selectFilteredFeatures from './selectFilteredFeatures'

const selectSortOrder = (state) => (state.settings.sort.order)
const selectSortOrderBy = (state) => (state.settings.sort.orderBy)

const selectFilteredAndSortedFeatures = createSelector(
    [
        selectFilteredFeatures,
        selectSortOrder,
        selectSortOrderBy
    ],
    sortFeatures
)

export default selectFilteredAndSortedFeatures
