import { createSelector } from 'reselect'

import selectFilteredFeatureCollection from './selectFilteredFeatureCollection'
import sortGeoJsonFeatureCollection from './util/sortGeoJsonFeatureCollection'

const selectSortKey = (state) => (state.settings.sort.key)
const selectSortOrder = (state) => (state.settings.sort.order)

const selectFilteredAndSortedFeatureCollection = createSelector(
    [
        selectFilteredFeatureCollection,
        selectSortKey,
        selectSortOrder
    ],
    sortGeoJsonFeatureCollection
)

export default selectFilteredAndSortedFeatureCollection
