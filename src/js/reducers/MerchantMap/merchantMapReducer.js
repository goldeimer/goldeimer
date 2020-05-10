import { combineReducers } from 'redux'

import error from './errorReducer'
import geoJsonSource from './geoJsonSourceReducer'
import proximityMarker from './proximityMarkerReducer'
import settings from './settingsReducer'

export default combineReducers({
    error,
    geoJsonSource,
    proximityMarker,
    settings
})
