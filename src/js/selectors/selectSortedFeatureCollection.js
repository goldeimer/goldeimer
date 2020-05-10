import { createSelector } from 'reselect'

import sortGeoJsonFeatureCollection from './util/sortGeoJsonFeatureCollection'

const selectFeatureCollection = (state) => (state.featureCollection)
const selectSortKey = (state) => (state.settings.sort.key)
const selectSortOrder = (state) => (state.settings.sort.order)

const selectSortedFeatureCollection = createSelector(
    [
        selectFeatureCollection,
        selectSortKey,
        selectSortOrder
    ],
    sortGeoJsonFeatureCollection
)

export default selectSortedFeatureCollection
