import errorWrapper from './util/errorWrapper'
import getSourceFeatures from './effects/getSourceFeatures'

/// -------------------------------- settings ---------------------------------

const RESET_FILTER = 'RESET_FILTER'
const resetSelectedTerms = () => ({
    type: RESET_FILTER
})

const RESET_SORT_ORDER_BY = 'RESET_SORT_ORDER_BY'
const resetSortOrderBy = () => ({
    type: RESET_SORT_ORDER_BY
})

const RESET_SORT_ORDER = 'RESET_SORT_ORDER'
const resetSortOrder = () => ({
    type: RESET_SORT_ORDER
})

const RESET_THEME = 'RESET_THEME'
const resetTheme = () => ({
    type: RESET_THEME
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

const SET_THEME = 'SET_THEME'
const setTheme = (themeId) => ({
    type: SET_THEME,
    themeId
})

const TOGGLE_FILTER_TERM = 'TOGGLE_FILTER_TERM'
const toggleFilterTerm = (taxonomyId, termId) => ({
    type: TOGGLE_FILTER_TERM,
    key: termId,
    groupKey: taxonomyId
})

/// ----------------------------- GeoJson source ------------------------------

const fetchSourceFeatures = () => errorWrapper(
    async (dispatch) => {
        dispatch(requestSourceFeatures())
        const features = await getSourceFeatures()
        dispatch(receiveSourceFeatures(features))
    },
    { successType: RECEIVE_SOURCE_FEATURES }
)

const REQUEST_SOURCE_FEATURES = 'REQUEST_SOURCE_FEATURES'
const requestSourceFeatures = () => ({
    type: REQUEST_SOURCE_FEATURES
})

const RECEIVE_SOURCE_FEATURES = 'RECEIVE_SOURCE_FEATURES'
const receiveSourceFeatures = (features) => ({
    type: RECEIVE_SOURCE_FEATURES,
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
    RESET_FILTER,
    resetSelectedTerms,
    RESET_SORT_ORDER_BY,
    resetSortOrderBy,
    RESET_SORT_ORDER,
    resetSortOrder,
    RESET_THEME,
    resetTheme,
    SET_SORT_ORDER_BY,
    setSortOrderBy,
    SET_SORT_ORDER,
    setSortOrder,
    SET_THEME,
    setTheme,
    TOGGLE_FILTER_TERM,
    toggleFilterTerm,
    // --- GeoJson source ---
    fetchSourceFeatures,
    REQUEST_SOURCE_FEATURES,
    RECEIVE_SOURCE_FEATURES,
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
