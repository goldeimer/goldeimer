import {
    RECEIVE_FEATURE_COLLECTION,
    REQUEST_FEATURE_COLLECTION
} from 'actions/merchantMapActions'

const INITIAL_STATE = null

const featureCollection = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case RECEIVE_FEATURE_COLLECTION:
        return action.featureCollection

    case REQUEST_FEATURE_COLLECTION:
        return INITIAL_STATE

    default:
        return state
    }
}

export default featureCollection
