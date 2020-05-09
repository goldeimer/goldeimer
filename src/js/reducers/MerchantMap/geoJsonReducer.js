import { combineReducers } from 'redux'

import {
    GEOJSON_SOURCE_SET
} from 'actions/merchantMapActions'

const INITIAL_STATE = {
    source: null
}

const sourceReducer = (state = INITIAL_STATE.source, action) => {
    switch (action.type) {
    case GEOJSON_SOURCE_SET:
        return action.source

    default:
        return state
    }
}

const geoJsonReducer = combineReducers({
    source: sourceReducer
})

export default geoJsonReducer
