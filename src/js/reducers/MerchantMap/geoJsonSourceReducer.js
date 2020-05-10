import {
    RECEIVE_GEOJSON_SOURCE,
    REQUEST_GEOJSON_SOURCE
} from 'actions/merchantMapActions'

const INITIAL_STATE = null

const geoJsonSource = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case RECEIVE_GEOJSON_SOURCE:
        return action.geoJson

    case REQUEST_GEOJSON_SOURCE:
        return INITIAL_STATE

    default:
        return state
    }
}

export default geoJsonSource
