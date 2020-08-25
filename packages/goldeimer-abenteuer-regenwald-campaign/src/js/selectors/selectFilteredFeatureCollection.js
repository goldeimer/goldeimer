import { createSelector } from 'reselect'

import filterGeoJsonFeatureCollection
    from './util/filterGeoJsonFeatureCollection'

const selectFeatureCollection = (state) => (state.featureCollection)
const selectSelectedTerms = (state) => (state.settings.filter.selectedTerms)

const selectFilteredFeatureCollection = createSelector(
    [
        selectFeatureCollection,
        selectSelectedTerms
    ],
    filterGeoJsonFeatureCollection
)

export default selectFilteredFeatureCollection
