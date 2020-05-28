import { combineReducers } from 'redux'

import {
    RESET_FEATURE_MARKER,
    RESET_PROXIMITY_MARKER,
    SET_FEATURE_MARKER,
    SET_PROXIMITY_MARKER
} from 'actions/mapActions'

const INITIAL_STATE = null

const makeMarkerReducer = (
    resetActionType = 'RESET',
    setActionType = 'SET'
) => (
    state = INITIAL_STATE,
    action
) => {
    switch (action.type) {
    case resetActionType:
        return INITIAL_STATE

    case setActionType:
        return {
            id: action.id,
            latitude: action.latitude,
            longitude: action.longitude,
            placeName: action.placeName
        }

    default:
        return state
    }
}

const featureMarkerReducer = makeMarkerReducer(
    RESET_FEATURE_MARKER,
    SET_FEATURE_MARKER
)
const proximityMarkerReducer = makeMarkerReducer(
    RESET_PROXIMITY_MARKER,
    SET_PROXIMITY_MARKER
)

const markerReducer = combineReducers({
    feature: featureMarkerReducer,
    proximity: proximityMarkerReducer
})

export default markerReducer
