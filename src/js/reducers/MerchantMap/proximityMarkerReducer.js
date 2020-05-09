import {
    PROXIMITY_MARKER_RESET,
    PROXIMITY_MARKER_SET
} from 'actions/merchantMapActions'

const DEFAULT_STATE = null

const proximityMarkerReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
    case PROXIMITY_MARKER_SET:
        return {
            latitude: action.latitude,
            longitude: action.longitude,
            placeName: action.placeName
        }

    case PROXIMITY_MARKER_RESET:
        return DEFAULT_STATE

    default:
        return state
    }
}

export default proximityMarkerReducer
