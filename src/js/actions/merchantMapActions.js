import errorWrapper from './util/errorWrapper'
import getGeoJsonSource from './effects/getGeoJsonSource'

/// -------------------------------- settings ---------------------------------

const RESET_FILTER_ENABLED_FOR_COMPONENTS =
    'RESET_FILTER_ENABLED_FOR_COMPONENTS'
const resetFilterEnabledForComponents = () => ({
    type: RESET_FILTER_ENABLED_FOR_COMPONENTS
})

const RESET_SELECTED_TERMS = 'RESET_SELECTED_TERMS'
const resetSelectedTerms = () => ({
    type: RESET_SELECTED_TERMS
})

const RESET_SORT_KEY = 'RESET_SORT_KEY'
const resetSortKey = () => ({
    type: RESET_SORT_KEY
})

const RESET_SORT_ORDER = 'RESET_SORT_ORDER'
const resetSortOrder = () => ({
    type: RESET_SORT_ORDER
})

const SET_SORT_KEY = 'SET_SORT_KEY'
const setSortKey = (key) => ({
    type: SET_SORT_KEY,
    key
})

const SET_SORT_ORDER = 'SET_SORT_ORDER'
const setSortOrder = (order) => ({
    type: SET_SORT_ORDER,
    order
})

const TOGGLE_FILTERABLE_COMPONENT = 'TOGGLE_FILTERABLE_COMPONENT'
const toggleFilterableComponent = (key) => ({
    type: TOGGLE_FILTERABLE_COMPONENT,
    key
})

const TOGGLE_TERM = 'TOGGLE_TERM'
const toggleTerm = (key) => ({
    type: TOGGLE_TERM,
    key
})

/// ----------------------------- GeoJson source ------------------------------

const fetchGeoJsonSource = () => errorWrapper(
    async (dispatch) => {
        dispatch(requestGeoJsonSource())
        const geoJson = await getGeoJsonSource()
        dispatch(receiveGeoJsonSource(geoJson))
    },
    { successType: RECEIVE_GEOJSON_SOURCE }
)

const REQUEST_GEOJSON_SOURCE = 'REQUEST_GEOJSON_SOURCE'
const requestGeoJsonSource = () => ({
    type: REQUEST_GEOJSON_SOURCE
})

const RECEIVE_GEOJSON_SOURCE = 'RECEIVE_GEOJSON_SOURCE'
const receiveGeoJsonSource = (geoJson) => ({
    type: RECEIVE_GEOJSON_SOURCE,
    geoJson
})

/// ---------------------------- proximity marker -----------------------------

const RESET_PROXIMITY_MARKER = 'RESET_PROXIMITY_MARKER'
const resetProximityMarker = () => ({ type: RESET_PROXIMITY_MARKER })

const SET_PROXIMITY_MARKER = 'SET_PROXIMITY_MARKER'
const setProximityMarker = (proximityMarker) => ({
    type: SET_PROXIMITY_MARKER,
    ...proximityMarker
})

export {
    // --- settings ---
    RESET_FILTER_ENABLED_FOR_COMPONENTS,
    resetFilterEnabledForComponents,
    RESET_SELECTED_TERMS,
    resetSelectedTerms,
    RESET_SORT_KEY,
    resetSortKey,
    RESET_SORT_ORDER,
    resetSortOrder,
    SET_SORT_KEY,
    setSortKey,
    SET_SORT_ORDER,
    setSortOrder,
    TOGGLE_FILTERABLE_COMPONENT,
    toggleFilterableComponent,
    TOGGLE_TERM,
    toggleTerm,
    // --- GeoJson source ---
    fetchGeoJsonSource,
    REQUEST_GEOJSON_SOURCE,
    RECEIVE_GEOJSON_SOURCE,
    // --- proximity marker ---
    RESET_PROXIMITY_MARKER,
    resetProximityMarker,
    SET_PROXIMITY_MARKER,
    setProximityMarker
}
