import errorWrapper from './util/errorWrapper'
import getGeoJsonSource from './effects/getGeoJsonSource'

/// --------------------------------- filter ----------------------------------

const RESET_SELECTED_TERMS = 'RESET_SELECTED_TERMS'
const resetSelectedTerms = () => ({
    type: RESET_SELECTED_TERMS
})

const TOGGLE_TERM = 'TOGGLE_TERM'
const toggleTerm = (key) => ({
    type: TOGGLE_TERM,
    key
})

/// --------------------------------- GeoJson ---------------------------------

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
    // --- filter ---
    resetSelectedTerms,
    RESET_SELECTED_TERMS,
    toggleTerm,
    TOGGLE_TERM,
    // --- GeoJson source ---
    fetchGeoJsonSource,
    REQUEST_GEOJSON_SOURCE,
    RECEIVE_GEOJSON_SOURCE,
    // --- proximity marker ---
    resetProximityMarker,
    RESET_PROXIMITY_MARKER,
    setProximityMarker,
    SET_PROXIMITY_MARKER
}
