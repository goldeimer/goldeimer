/// --------------------------------- filter ----------------------------------

const FILTER_SELECTED_TERMS_RESET = 'FILTER_SELECTED_TERMS_RESET'
const filter_selectedTerms_reset = () => ({ type: FILTER_SELECTED_TERMS_RESET })

const FILTER_SELECTED_TERMS_TOGGLE_TERM = 'FILTER_SELECTED_TERMS_TOGGLE_TERM'
const filter_selectedTerms_toggleTerm = (key) => ({
    type: FILTER_SELECTED_TERMS_TOGGLE_TERM,
    key
})

/// ----------------------------- GeoJson source ------------------------------

// TODO:
// - integrate redux thunk middleware
// - transform into async action creator `FETCH_GEOJSON_SOURCE`
const GEOJSON_SOURCE_SET = 'GEOJSON_SOURCE_SET'
const geoJson_source_set = (source) => ({
    type: GEOJSON_SOURCE_SET,
    source
})

/// ---------------------------- proximity marker -----------------------------

const PROXIMITY_MARKER_RESET = 'PROXIMITY_MARKER_RESET'
const proximityMarker_reset = () => ({ type: PROXIMITY_MARKER_RESET })

const PROXIMITY_MARKER_SET = 'PROXIMITY_MARKER_SET'
const proximityMarker_set = (proximityMarker) => ({
    type: PROXIMITY_MARKER_SET,
    ...proximityMarker
})

export {
    // --- filter ---
    FILTER_SELECTED_TERMS_RESET,
    filter_selectedTerms_reset,
    FILTER_SELECTED_TERMS_TOGGLE_TERM,
    filter_selectedTerms_toggleTerm,
    // --- GeoJson source ---
    GEOJSON_SOURCE_SET,
    geoJson_source_set,
    // --- proximity marker ---
    PROXIMITY_MARKER_RESET,
    proximityMarker_reset,
    PROXIMITY_MARKER_SET,
    proximityMarker_set
}
