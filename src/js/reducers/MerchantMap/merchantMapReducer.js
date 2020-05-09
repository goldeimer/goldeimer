import { combineReducers } from 'redux'

import filter from './filterReducer'
import geoJson from './geoJsonReducer'
import proximityMarker from './proximityMarkerReducer'

export default combineReducers({
    filter,
    geoJson,
    proximityMarker
})
