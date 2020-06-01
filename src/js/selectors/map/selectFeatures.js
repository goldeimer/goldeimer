import { createSelector } from 'reselect'

import {
    selectFilter,
    selectSortOrder,
    selectSortOrderBy
} from 'selectors/map/selectSettings'

import filterFeatures from 'utilities/map/filter'
import sortFeatures from 'utilities/map/sort'
import {
    transformGeoJsonFeaturesToGeometries,
    transformGeoJsonFeaturesToLookup,
    transformGeoJsonFeaturesToMapEssential,
    transformGeoJsonFeaturesToSearcheables
} from 'utilities/map/transformations'

/// ---------------------------- feature selectors ----------------------------

const selectSourceFeatures = (state) => (state.map.features.source.features)
// const selectSourceReceived = (state) => (state.map.features.source.received)
const selectViewportFeatures = (state) => (state.map.features.viewport)

/// --------------------------- selector factories ----------------------------

const makeFilteredSelector = (
    inputSelector,
    filterSettingsSelector
) => createSelector(
    inputSelector,
    filterSettingsSelector,
    filterFeatures
)

const makeGeometrySelector = (inputSelector) => createSelector(
    inputSelector,
    transformGeoJsonFeaturesToGeometries
)

const makeLookupSelector = (inputSelector) => createSelector(
    inputSelector,
    transformGeoJsonFeaturesToLookup
)

const makeMapEssentialSelector = (inputSelector) => createSelector(
    inputSelector,
    transformGeoJsonFeaturesToMapEssential
)

const makeSearchablesSelector = (inputSelector) => createSelector(
    inputSelector,
    transformGeoJsonFeaturesToSearcheables
)

const makeSortedSelector = (inputSelector) => createSelector(
    inputSelector,
    selectSortOrderBy,
    selectSortOrder,
    sortFeatures
)

/// --------------------------- composed selectors ----------------------------

const selectFilteredSourceFeatures = makeFilteredSelector(
    selectSourceFeatures,
    selectFilter
)

const selectFilteredGeometry = makeGeometrySelector(
    selectFilteredSourceFeatures
)

const selectFilteredLookup = makeLookupSelector(
    selectFilteredSourceFeatures
)

const selectFilteredMapEssential = makeMapEssentialSelector(
    selectFilteredSourceFeatures
)

const selectFilteredSearchables = makeSearchablesSelector(
    selectFilteredSourceFeatures
)

const selectSortedSource = makeSortedSelector(selectSourceFeatures)

export {
    selectFilter,
    selectFilteredGeometry,
    selectFilteredLookup,
    selectFilteredMapEssential,
    selectFilteredSearchables,
    selectSortedSource,
    selectViewportFeatures
}
