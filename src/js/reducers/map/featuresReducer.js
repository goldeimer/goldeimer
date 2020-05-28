import { combineReducers } from 'redux'

import {
    RECEIVE_SOURCE_FEATURES,
    REQUEST_SOURCE_FEATURES
} from 'actions/mapActions'

const INITIAL_SOURCE_FEATURES = {
    features: [],
    received: null
}
const sourceFeaturesReducer = (
    state = INITIAL_SOURCE_FEATURES,
    action
) => {
    switch (action.type) {
    case RECEIVE_SOURCE_FEATURES: {
        const { features } = action

        return {
            features,
            received: Date.now()
        }
    }

    case REQUEST_SOURCE_FEATURES:
        return INITIAL_SOURCE_FEATURES

    default:
        return state
    }
}

const INITIAL_VIEWPORT_FEATURES = []
const viewportFeaturesReducer = (
    state = INITIAL_VIEWPORT_FEATURES,
    action
) => (
    // TODO!
    INITIAL_VIEWPORT_FEATURES
)

const featuresReducer = combineReducers({
    source: sourceFeaturesReducer,
    viewport: viewportFeaturesReducer
})

export default featuresReducer
