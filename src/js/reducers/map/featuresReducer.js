import { transformFeatureToEssentialMarkerProps } from 'util/map/geoJsonUtil'

import {
    RECEIVE_FEATURES,
    REQUEST_FEATURES
} from 'actions/merchantMapActions'

const INITIAL_STATE = {
    all: null,
    markers: null,
    received: null
}

const extractMarkersFromFeatures = (features) => {
    if (!features) {
        return null
    }

    return features.map((feature) => (
        transformFeatureToEssentialMarkerProps(feature)
    ))
}

const features = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case RECEIVE_FEATURES: {
        const { features: all } = action

        return {
            all,
            markers: extractMarkersFromFeatures(all),
            received: Date.now()
        }
    }

    case REQUEST_FEATURES:
        return INITIAL_STATE

    default:
        return state
    }
}

export default features
