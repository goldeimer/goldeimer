const proximityMarker = (state = null, action) => {
    switch (action.type) {
    case 'SET_PROXIMITY_MARKER':
        return {
            latitude: action.latitude,
            longitude: action.longitude,
            placeName: action.placeName
        }

    default:
        return state
    }
}

export default proximityMarker
