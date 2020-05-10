import {
    RESET_PROXIMITY_MARKER,
    SET_PROXIMITY_MARKER
} from 'actions/merchantMapActions'

const INITIAL_STATE = null

const proximityMarkerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case RESET_PROXIMITY_MARKER:
        return INITIAL_STATE

    case SET_PROXIMITY_MARKER:
        return {
            latitude: action.latitude,
            longitude: action.longitude,
            placeName: action.placeName
        }

    default:
        return state
    }
}

export default proximityMarkerReducer
