import errorWrapper from './util/errorWrapper'
import getFeatures from './effects/getFeatures'

/// -------------------------------- settings ---------------------------------

const RESET_SELECTED_TERMS = 'RESET_SELECTED_TERMS'
const resetSelectedTerms = () => ({
    type: RESET_SELECTED_TERMS
})

const RESET_SORT_ORDER_BY = 'RESET_SORT_ORDER_BY'
const resetSortOrderBy = () => ({
    type: RESET_SORT_ORDER_BY
})

const RESET_SORT_ORDER = 'RESET_SORT_ORDER'
const resetSortOrder = () => ({
    type: RESET_SORT_ORDER
})

const SET_SORT_ORDER_BY = 'SET_SORT_ORDER_BY'
const setSortOrderBy = (key) => ({
    type: SET_SORT_ORDER_BY,
    key
})

const SET_SORT_ORDER = 'SET_SORT_ORDER'
const setSortOrder = (order) => ({
    type: SET_SORT_ORDER,
    order
})

const TOGGLE_TERM = 'TOGGLE_TERM'
const toggleTerm = (taxonomyId, termId) => ({
    type: TOGGLE_TERM,
    key: termId,
    groupKey: taxonomyId
})

/// ----------------------------- GeoJson source ------------------------------

const fetchFeatures = () => errorWrapper(
    async (dispatch) => {
        dispatch(requestFeatures())
        const features = await getFeatures()
        dispatch(receiveFeatures(features))
    },
    { successType: RECEIVE_FEATURES }
)

const REQUEST_FEATURES = 'REQUEST_FEATURES'
const requestFeatures = () => ({
    type: REQUEST_FEATURES
})

const RECEIVE_FEATURES = 'RECEIVE_FEATURES'
const receiveFeatures = (features) => ({
    type: RECEIVE_FEATURES,
    features
})

/// --------------------------------- markers ---------------------------------

const RESET_FEATURE_MARKER = 'RESET_FEATURE_MARKER'
const resetFeatureMarker = () => ({ type: RESET_FEATURE_MARKER })

const RESET_PROXIMITY_MARKER = 'RESET_PROXIMITY_MARKER'
const resetProximityMarker = () => ({ type: RESET_PROXIMITY_MARKER })

const SET_FEATURE_MARKER = 'SET_FEATURE_MARKER'
const setFeatureMarker = (marker) => ({
    type: SET_FEATURE_MARKER,
    ...marker
})

const SET_PROXIMITY_MARKER = 'SET_PROXIMITY_MARKER'
const setProximityMarker = (marker) => ({
    type: SET_PROXIMITY_MARKER,
    ...marker
})

export {
    // --- settings ---
    RESET_SELECTED_TERMS,
    resetSelectedTerms,
    RESET_SORT_ORDER_BY,
    resetSortOrderBy,
    RESET_SORT_ORDER,
    resetSortOrder,
    SET_SORT_ORDER_BY,
    setSortOrderBy,
    SET_SORT_ORDER,
    setSortOrder,
    TOGGLE_TERM,
    toggleTerm,
    // --- GeoJson source ---
    fetchFeatures,
    REQUEST_FEATURES,
    RECEIVE_FEATURES,
    // --- markers ---
    RESET_FEATURE_MARKER,
    resetFeatureMarker,
    SET_FEATURE_MARKER,
    setFeatureMarker,
    RESET_PROXIMITY_MARKER,
    resetProximityMarker,
    SET_PROXIMITY_MARKER,
    setProximityMarker
}
