import { createSelector } from 'reselect'

import sortGeoJsonFeatureCollection from './util/sortGeoJsonFeatureCollection'

const selectFeatureCollection = (state) => (state.featureCollection)
const selectSortOrder = (state) => (state.settings.sort.order)
const selectSortOrderBy = (state) => (state.settings.sort.oderBy)

const selectSortedFeatureCollection = createSelector(
    [
        selectFeatureCollection,
        selectSortOrder,
        selectSortOrderBy
    ],
    sortGeoJsonFeatureCollection
)

export default selectSortedFeatureCollection
