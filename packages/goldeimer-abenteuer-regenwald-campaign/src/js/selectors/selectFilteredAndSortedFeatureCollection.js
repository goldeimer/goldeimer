import { createSelector } from 'reselect'

import selectFilteredFeatureCollection from './selectFilteredFeatureCollection'
import sortGeoJsonFeatureCollection from './util/sortGeoJsonFeatureCollection'

const selectSortOrder = (state) => (state.settings.sort.order)
const selectSortOrderBy = (state) => (state.settings.sort.orderBy)

const selectFilteredAndSortedFeatureCollection = createSelector(
    [
        selectFilteredFeatureCollection,
        selectSortOrder,
        selectSortOrderBy
    ],
    sortGeoJsonFeatureCollection
)

export default selectFilteredAndSortedFeatureCollection
