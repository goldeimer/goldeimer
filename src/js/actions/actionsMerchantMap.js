const setProximityMarker = (proximityMarker) => ({
    type: 'SET_PROXIMITY_MARKER',
    ...proximityMarker
})

const toggleFilterItem = (key) => ({
    type: 'TOGGLE_FILTER_ITEM',
    key
})

export {
    setProximityMarker,
    toggleFilterItem
}
